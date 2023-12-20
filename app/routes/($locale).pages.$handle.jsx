import {json} from '@shopify/remix-oxygen';
import {Link, useLoaderData, useLocation} from '@remix-run/react';
import {useRef,useState,useEffect} from 'react';
import DraggableElement from '../components/DraggableElement';
import LB1 from '../Assets/LB1.png';
import LB2 from '../Assets/LB2.png';
import LB3 from '../Assets/LB3(2).png';
import SummerCapsule from '../components/SummerCapsule';
import ContactUs from '../components/Contactus';
import ReturnPolicy from '../components/Returnpolicy';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Tinyomo from '../Assets/tinylogo.png';
/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.page.title ?? ''}`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, context}) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return json({page});
}

export default function Page() {
  /** @type {LoaderReturnData} */
  const {page} = useLoaderData();
  const divRef = useRef(null);
  console.log(page);
  const isBrowser = typeof window !== 'undefined';
  const [windowWidth, setWindowWidth] = useState(isBrowser ? window.innerWidth : 0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const dragMouseDown = (e) => {
  //   e = e || window.event;
  //   e.preventDefault();
  //   let pos1 = 0,
  //     pos2 = 0,
  //     pos3 = 0,
  //     pos4 = 0;

  //   pos3 = e.clientX;
  //   pos4 = e.clientY;
  //   document.onmouseup = closeDragElement;
  //   document.onmousemove = elementDrag;

  //   function elementDrag(e) {
  //     e = e || window.event;
  //     e.preventDefault();
  //     pos1 = pos3 - e.clientX;
  //     pos2 = pos4 - e.clientY;
  //     pos3 = e.clientX;
  //     pos4 = e.clientY;
  //     divRef.current.style.top = divRef.current.offsetTop - pos2 + 'px';
  //     divRef.current.style.left = divRef.current.offsetLeft - pos1 + 'px';
  //   }

  //   function closeDragElement() {
  //     document.onmouseup = null;
  //     document.onmousemove = null;
  //   }
  // };

  return (
    <div className="page">
      {page.title === 'Aboutus' ? (
        <div className="About-Container">
          <div className="About-section-1">
            <div className="About-Left-section-1">
              <h1>ABOUT US</h1>
            </div>
          </div>  
          <div className="About-section-2">
            <p>
            At<img style={{maxWidth:'69px', maxHeight:'69px', bottom:'-27px', position:'relative'}} src={Tinyomo}/>, we believe creativity to transcend time and create pieces that stand the test of changing trends. Our designs are carefully curated to encapsulate the beauty of fleeting moments, turning them into everlasting expressions of style.
            </p>
            <br/>
            <br/>
            <p>
            Our commitment extends to comfort and sustainability. From fabric selection to the final stitch, every<span className='tinyomo'><img src={Tinyomo}/></span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pieces are designed and produced in Indonesia. 
            </p>
          </div>
        </div>
      ) : page.title === 'lookbook' ? (
        <div className="lookbook-container">
          {isBrowser && windowWidth <= 768? (
            
          <div className="draggable-container">
          <DraggableElement startPosition={{x: 20, y: 59}}>
            <div className="draggable-item">
              <img src={LB1} />
            </div>
          </DraggableElement>

          <DraggableElement startPosition={{x: 46, y: 180}}>
            <div className="draggable-item">
              <img src={LB2} />
            </div>
          </DraggableElement>

          <DraggableElement startPosition={{x: 50, y: 304}}>
            <div className="draggable-item">
              <img src={LB3} />
            </div>
          </DraggableElement>
          {/* Add more DraggableElement components for additional draggable elements */}
        </div>
          ): (
            <div className="draggable-container">
              <Link to="/pages/summer-capsule-2023">
              <DraggableElement startPosition={{x: 333, y: 59}}>
                <div className="draggable-item">
                  <img src={LB1} />
                </div>
              </DraggableElement>
              </Link>
  
              <DraggableElement startPosition={{x: 680, y: 180}}>
                <div className="draggable-item">
                  <img src={LB2} />
                </div>
              </DraggableElement>
  
              <DraggableElement startPosition={{x: 500, y: 304}}>
                <div className="draggable-item">
                  <img src={LB3} />
                </div>
              </DraggableElement>
              {/* Add more DraggableElement components for additional draggable elements */}
            </div>
          )}
        </div>
      ) : page.title === 'Summer-Capsule-2023' ? (
        <SummerCapsule/>
      ): page.title === 'Contact-us' ?(
        <ContactUs/>
      ): page.title === 'Return-Policy' ?(
        <ReturnPolicy/>
      ):(
        <main dangerouslySetInnerHTML={{__html: page.body}} />
      )}
    </div>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
