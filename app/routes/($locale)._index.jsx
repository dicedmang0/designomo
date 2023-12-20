import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import Image1 from '../Assets/Home-Section1.png';
import Image2 from '../Assets/LILYDRESS.png';
import Image3 from '../Assets/DesignbyOMO.png';
import Image4 from '../Assets/PIGMENT.png';
import Image5 from '../Assets/LACELONGSLEEVE.png';
import {InstagramEmbed} from 'react-social-media-embed';
import { useEffect } from 'react';
import Logo from '../Assets/logo-omo-2.gif';
import { motion } from 'framer-motion';
import InstaFeeds   from '../components/InstaFeeds';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(FEATURED_COLLECTION_QUERY);
  const featuredCollection = collections.nodes[0];
  const recommendedProducts = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  return defer({featuredCollection, recommendedProducts});
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  
  const data = useLoaderData();
  const token = 'IGQWROWTFrLWl6T28ya3RsSmJYaE05Rm5xa1J1NEhvWTdscWlLUFNlT1J0SldxMEdJSl9OOUl1WUlmckRvSkkyYUtHTmNrNy1SM1NrbWpOb1RLSkpSY3VRUU1rVjNCa1hTN1VyZA0tKYWJ6b0JBeTBoRU8yQktEb3cZD';
  return (
    <div className="home">
      <motion.div
      initial={{
        opacity:1,
      }}
      whileInView={{
        opacity: 0,
      }}
      transition={{
        duration: 0.5,
        delay:4
      }}
      viewport={{ once: true}} className='Transition' style={{width:'100%',height:'100vh', position:'fixed',backgroundColor:'white',zIndex:1, display:'flex',justifyContent:'center', alignItems:'center'}} >
      <img className='Animate-UP'  style={{height:'25%'}} src={Logo} alt='OMO-Logo' />
      </motion.div>
      <div className='LP-Container'>
      <img className='Image-LP' src={Image1} />
      </div>
      <div className='Home-Section-1'>
        <img  src={Image2} />
        <img  src={Image3} />
      </div>
      <div className='Home-Section-2' >
        <img src={Image4} />
        <img src={Image5} />
      </div>
      <div className='Instagram-Section'>
        <img/>
        <div className='Instagram-feed'>
        {/* <InstaFeeds token={token} limit={4}/> */}
        <img/>
        <img/>
        <img/>
        <img/>
        </div>
      </div>

      {/* <div style={{display: 'flex', justifyContent: 'center'}}>
        <InstagramEmbed
          url="https://www.instagram.com/designbyomo/"
          width={1080}
        />
      </div> */}

      {/* <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} /> */}
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
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
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
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
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
