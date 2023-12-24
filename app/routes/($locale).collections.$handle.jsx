import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  Image,
  Money,
} from '@shopify/hydrogen';
import {useVariantUrl} from '~/utils';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({request, params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 40,
  });

  if (!handle) {
    return redirect('/collections');
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  return json({collection});
}

export default function Collection() {
  /** @type {LoaderReturnData} */
  const {collection} = useLoaderData();

  return (
    <div className="collection">
      <p className="collection-description">{collection.description}</p>
      <Pagination connection={collection.products}>
        {({nodes, isLoading, PreviousLink, NextLink}) => (
          <>
            <PreviousLink style={{alignSelf:'center'}}>
              {isLoading ? 'Loading...' : <button>LOAD PREVIOUS</button>}
            </PreviousLink>
            <ProductsGrid products={nodes} />
            <br />
            <NextLink style={{alignSelf:'center'}}>
              {isLoading ? 'Loading...' : <button>LOAD MORE</button>}
            </NextLink>
          </>
        )}
      </Pagination>
    </div>
  );
}

/**
 * @param {{products: ProductItemFragment[]}}
 */
function ProductsGrid({products}) {
  return (
    <div className="products-grid">
      {products.map((product, index) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            loading={index < 8 ? 'eager' : undefined}
          />
        );
      })}
    </div>
  );
}

/**
 * @param {{
 *   product: ProductItemFragment;
 *   loading?: 'eager' | 'lazy';
 * selectedVariant: ProductFragment['selectedVariant'];
 * }}
 */
function ProductItem({product, loading}) {
  const variant = product.variants.nodes[0];
  console.log(variant);
  const variantUrl = useVariantUrl(product.handle, variant.selectedOptions);
  const hasCompareAtPrice = variant.compareAtPriceV2 && variant.priceV2.amount < variant.compareAtPriceV2.amount;
  console.log(product)
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {product.featuredImage && (
        <Image
          alt={product.featuredImage.altText || product.title}
          aspectRatio="1/1"
          data={product.featuredImage}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <h4 style={{textAlign: 'center', fontFamily:'Arial',textTransform:'uppercase'}}>{product.title}</h4>
      <small style={{textAlign:'center', fontFamily:'Arial', fontStyle:'italic'}}>
      {hasCompareAtPrice && (
          <span style={{ textDecoration: 'line-through', display:'flex', justifyContent:'center', marginBottom:'10px' }}>
            <Money data={variant.compareAtPriceV2} />
          </span>
        )}
        <Money style={{fontWeight:'700'}} data={variant.priceV2} />
      </small>
    </Link>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductVariant on ProductVariant {
    selectedOptions {
      name
      value
    }
    compareAtPriceV2 {
      ...MoneyProductItem
    }
    priceV2 {
      ...MoneyProductItem
    }
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
  }
`;

// NOTE: https://shopify.dev/docs/api/storefront/2022-04/objects/collection
const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
`;

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
