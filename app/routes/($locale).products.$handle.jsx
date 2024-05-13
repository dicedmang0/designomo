import {Suspense,useState, useRef, useEffect} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData} from '@remix-run/react';
import Slider from "react-slick";
import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  CartForm,
} from '@shopify/hydrogen';
import {getVariantUrl} from '~/utils';
import chart from '../Assets/chart.png';
import chart2 from '../Assets/sizechart.png'
import { useCurrency } from '../contexts/CurrencyContext';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);
  const selectedOptions = getSelectedProductOptions(request).filter(
    (option) =>
      // Filter out Shopify predictive search query params
      !option.name.startsWith('_sid') &&
      !option.name.startsWith('_pos') &&
      !option.name.startsWith('_psq') &&
      !option.name.startsWith('_ss') &&
      !option.name.startsWith('_v') &&
      // Filter out third party tracking params
      !option.name.startsWith('fbclid'),
  );

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  // await the query for the critical product data
  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle, selectedOptions},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option) => option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  } else {
    // if no selected variant was returned from the selected options,
    // we redirect to the first variant's url with it's selected options applied
    if (!product.selectedVariant) {
      throw redirectToFirstVariant({product, request});
    }
  }

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deffered query resolves, the UI will update.
  const variants = storefront.query(VARIANTS_QUERY, {
    variables: {handle},
  });

  return defer({product, variants, recommendedProducts});
}

/**
 * @param {{
 *   product: ProductFragment;
 *   request: Request;
 * }}
 */
function redirectToFirstVariant({product, request}) {
  const url = new URL(request.url);
  const firstVariant = product.variants.nodes[0];

  return redirect(
    getVariantUrl({
      pathname: url.pathname,
      handle: product.handle,
      selectedOptions: firstVariant.selectedOptions,
      searchParams: new URLSearchParams(url.search),
    }),
    {
      status: 302,
    },
  );
}


export default function Product() {
  /** @type {LoaderReturnData} */
  const { currency } = useCurrency();
  const  data = useLoaderData();
  if (!data) {
    return <div>Loading data or data is not available...</div>;
  }
  const { product, variants } = data;
  const {selectedVariant, images} = product;
  const imageNodes = images.edges.map(edge => edge.node);
  return (
    <div className="product">
      <ProductImage 
      selectedImage={selectedVariant.image} 
      images={imageNodes}
      selectedVariant={selectedVariant}
      />
      <ProductMain
        selectedVariant={selectedVariant}
        product={product}
        variants={variants}
        currency={currency}
      />
        <RecommendedProducts products={data.recommendedProducts} currency={currency} />
    </div>
  );
}

/**
 * @param {{images: ProductVariantFragment['image']}}
 * 
 */
function ProductImage({ selectedImage, images, selectedVariant }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
          slider.slickNext();
        } else {
          slider.slickPrev();
        }
      };

      const sliderNode = slider.innerSlider && slider.innerSlider.list;
      if (sliderNode) {
        sliderNode.addEventListener('wheel', handleWheel, { passive: false });
      }

      return () => {
        if (sliderNode) {
          sliderNode.removeEventListener('wheel', handleWheel);
        }
      };
    }
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
  };

  // Safely checking for 'Color' option and ensuring 'altText' is not null before calling 'includes'
  const variantColor = selectedVariant.selectedOptions.find(option => option.name === 'Color')?.value;
  const filteredImages = images.filter(img => img.altText && img.altText.includes(variantColor) && img.id !== selectedImage.id);
  // Ensure selectedImage is always shown first if available
  const imageSet = [selectedImage, ...filteredImages].filter(Boolean);  // Also filters out any null or undefined images

  if (!imageSet.length) {
    return <div className="product-image">No images available</div>;
  }

  return (
    <div className="product-image-slider">
      <Slider ref={sliderRef} {...settings}>
        {imageSet.map((image, index) => (
          <div key={index}>
            <img
              src={image.url || image.originalSrc}
              alt={image.altText || 'Product Image'}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}




/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Promise<ProductVariantsQuery>;
*    products: Promise<RecommendedProductsQuery>;
 * 
 * }}
 */
function ProductMain({selectedVariant, product, variants, currency}) {
  const [isOpen, setIsOpen] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const [isOptionAvailable, setIsOptionAvailable] = useState(selectedVariant ? selectedVariant.availableForSale : true);
  const data = useLoaderData();
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  const SizeToogle = () => {
    setSizeOpen(!sizeOpen);
  };
  const handleOptionSelection = (isAvailable) => {
    setIsOptionAvailable(isAvailable);
  };
  const {title, descriptionHtml} = product;
  return (
    <div className="product-main">
      <h1 style={{textTransform:'uppercase', margin:'0px'}}>{title}</h1>
      <ProductPrice selectedVariant={selectedVariant} currency={currency} />
      <br />
      <br />
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <div>
            <strong>Description</strong>
          <div dangerouslySetInnerHTML={{__html: descriptionHtml}} />
      </div>
      <br />
      <br />
      <div className="Button-container" style={{display: 'flex'}}>
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => {
            window.location.href = window.location.href + '#cart-aside';
          }}
          lines={
            selectedVariant
              ? [
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                  },
                ]
              : []
          }
        >
          {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
        </AddToCartButton>
        <button className='checkout-btn'>
          <a href="#cart-aside">CHECKOUT</a>
        </button>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   selectedVariant: ProductFragment['selectedVariant'];
 * }}
 */
function ProductPrice({selectedVariant, currency}) {
  const convertPrice = (price) => {
    // Example conversion logic
    const exchangeRate = currency === 'USD' ? 0.000068 : 1; // Use actual exchange rate
    return price * exchangeRate;
  };
  const formatCurrency = (amount, currency) => {
    if (currency === 'USD') {
      return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else {
      // For IDR, manually add the 'IDR' code and format with dot separators
      return `IDR ${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    }
  };
  if (!selectedVariant) {
    return null; // Or some loading/fallback state
  }
  const convertedPrice = convertPrice(selectedVariant.price.amount);
  const convertedCompareAtPrice = selectedVariant.compareAtPrice 
    ? convertPrice(selectedVariant.compareAtPrice.amount) 
    : null;

  const isOnSale = convertedCompareAtPrice && convertedPrice && convertedCompareAtPrice > convertedPrice;

  return (
    <div className="product-price">
      {isOnSale ? (
        <>
          <div className="product-price-on-sale">
            <span style={{ textDecoration: 'line-through', marginRight: '10px' }}>
            {formatCurrency(convertedCompareAtPrice, currency)}
            </span>
            <span style={{color:'red'}}>
            {formatCurrency(convertedPrice, currency)}
            </span>
          </div>
        </>
      ) : (
        <span>{formatCurrency(convertedPrice, currency)}</span>
      )}
    </div>
  );
}

/**
 * @param {{
 *   product: ProductFragment;
 *   selectedVariant: ProductFragment['selectedVariant'];
 *   variants: Array<ProductVariantFragment>;
 * }}
 */
function ProductForm({product, selectedVariant, variants}) {
  return (
    <div className="product-form">
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option}) => <ProductOptions key={option.name} option={option} />}
      </VariantSelector>
      <br />
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          window.location.href = window.location.href + '#cart-aside';
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
    </div>
  );
}

/**
 * @param {{
 * option: VariantOption;
 * image: ProductVariantFragment['image'];
 * 
 * }}
 */
function ProductOptions({option}) {
    return (
    <div className="product-options" key={option.name}>
      <strong>{option.name}</strong>
      <div className="product-options-grid">
        {option.values.map(({value, isAvailable, isActive, to, url}) => {
          return (
            <Link
              className="product-options-item"
              key={option.name + value}
              prefetch="intent"
              preventScrollReset
              replace
              to={to}
              style={{
                border: isActive ? '1px solid black' : '1px solid transparent',
                opacity: isAvailable ? 1 : 0.3,
              }}
            >
              {value}
            </Link>
          );
        })}
      </div>
      <br />
    </div>
  );
}


/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: CartLineInput[];
 *   onClick?: () => void;
 * }}
 */
function AddToCartButton({analytics, children, disabled, lines, onClick}) {
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            className='AddtoCart'
            onClick={onClick}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}
/**
 * @param {{
*   products: Promise<RecommendedProductsQuery>;
* }}
*/
function RecommendedProducts({products, currency}) {
  const formatCurrency = (amount, currency) => {
    if (currency === 'USD') {
      return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else {
      // For IDR, manually add the 'IDR' code and format with dot separators
      return `IDR ${amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
    }
  };
  const convertPrice = (price) => {
    const exchangeRate = currency === 'USD' ? 0.000068 : 1; // Replace with actual exchange rate
    return price * exchangeRate;
  };
 return (
   <div className="recommended-products">
     <h2>Related Products</h2>
     <Suspense fallback={<div>Loading...</div>}>
       <Await resolve={products}>
         {({products}) => (
           <div className="recommended-products-grid">
             {products.nodes.map((product) => {
              const convertedPrice = formatCurrency(convertPrice(product.priceRange.minVariantPrice.amount), currency);
              
              return (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4 style={{textTransform:'uppercase'}}>{product.title}</h4>
                  
                  <small>{convertedPrice}</small>
                  
                </Link>
              )
             }
             )}
           </div>
         )}
       </Await>
     </Suspense>
     <br />
   </div>
 );
}

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

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    images(first: 20) {
      edges {
        node {
          id
          originalSrc
          altText
          width
          height
        }
      }
    }
    options {
      name
      values
    }
    selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    variants(first: 1) {
      nodes {
        ...ProductVariant
      }
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

const PRODUCT_VARIANTS_FRAGMENT = `#graphql
  fragment ProductVariants on Product {
    variants(first: 250) {
      nodes {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  ${PRODUCT_VARIANTS_FRAGMENT}
  query ProductVariants(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...ProductVariants
    }
  }
`;
const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@remix-run/react').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
/** @typedef {import('storefrontapi.generated').ProductVariantsQuery} ProductVariantsQuery */
/** @typedef {import('storefrontapi.generated').ProductVariantFragment} ProductVariantFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/hydrogen').VariantOption} VariantOption */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineInput} CartLineInput */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').SelectedOption} SelectedOption */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
