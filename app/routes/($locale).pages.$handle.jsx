import {json} from '@shopify/remix-oxygen';
import {Link, useLoaderData, useLocation} from '@remix-run/react';
import {useRef,useState,useEffect} from 'react';
import DraggableElement from '../components/DraggableElement';
import LB1 from '../Assets/DREAM.png';
import LB2 from '../Assets/FLEETING.png';
import LB3 from '../Assets/FLOWERS.png';
import LB4 from '../Assets/LOOK.png';
import LB5 from '../Assets/OMOW.png';
import LB6 from '../Assets/OMOX.png';
import LBM1 from '../Assets/LookBookMobile/Group11.png';
import LBM2 from '../Assets/LookBookMobile/Group12.png';
import LBM3 from '../Assets/LookBookMobile/Group24.png';
import LBM4 from '../Assets/LookBookMobile/Group25.png';
import LBM5 from '../Assets/LookBookMobile/Group26.png';
import LBM6 from '../Assets/LookBookMobile/Group42.png';
import TechnicolorDreams from '../components/TechnicolorDreams';
import Flowers from '../components/Flowers';
import Look from '../components/Look';
import Omox from '../components/Omox';
import OmoW from '../components/OmoWorld';
import FleetingThreads from '../components/FleetingThreads';
import ContactUs from '../components/Contactus';
import ReturnPolicy from '../components/Returnpolicy';
import Shippingpolicy from '../components/Shippingpolicy';
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
  const isBrowser = typeof window !== 'undefined';
  const [windowWidth, setWindowWidth] = useState(isBrowser ? window.innerWidth : 0);
  const [isDragging, setIsDragging] = useState(false);
  const handleDrag = (dragging) => {
  setIsDragging(dragging);
  };
  const navigate = (path) => {
    window.location.href = path;
  };
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
          <Link to="/pages/technicolor-dreams">
              <DraggableElement startPosition={{x: 150, y: 326}}>
                <div className="draggable-item">
                  <img src={LB1} />
                </div>
              </DraggableElement>
              </Link>
              <Link to='/pages/fleeting-threads'>
              <DraggableElement startPosition={{x: -50, y: 50}}>
                <div className="draggable-item">
                  <img src={LB2} />
                </div>
              </DraggableElement></Link>
  
              <Link to='/pages/flowers-dont-dance'>
              <DraggableElement startPosition={{x: -100, y: 220}}>
                <div className="draggable-item">
                  <img src={LB3} />
                </div>
              </DraggableElement></Link>
              <Link to='/pages/look-cool-2023'>
              <DraggableElement startPosition={{x: -200, y: 400}}>
                <div className="draggable-item">
                  <img src={LB4} />
                </div>
              </DraggableElement></Link>
              <Link to='/pages/its-an-omos-world'>
              <DraggableElement startPosition={{x: -100, y: 500}}>
                <div className="draggable-item">
                  <img src={LB5} />
                </div>
              </DraggableElement></Link>
              <Link to='/pages/omo-x-agittaria'>
              <DraggableElement startPosition={{x: -200, y: 200}}>
                <div className="draggable-item">
                  <img src={LB6} />
                </div>
              </DraggableElement>
              </Link>
          {/* Add more DraggableElement components for additional draggable elements */}
        </div>
          ): (
            <div className="draggable-container">
              <Link to='/pages/technicolor-dreams'>
              <DraggableElement 
              startPosition={{x: 543, y: 426}}
              >
                <div className="draggable-item">
                  <img src={LB1} />
                </div>
              </DraggableElement>
              </Link>
              <Link to='/pages/fleeting-threads'>
              <DraggableElement startPosition={{x: 659, y: 200}}>
                <div className="draggable-item">
                  <img src={LB2} />
                </div>
              </DraggableElement></Link>
  
              <Link to='/pages/flowers-dont-dance'>
              <DraggableElement startPosition={{x: -360, y: 144}}>
                <div className="draggable-item">
                  <img src={LB3} />
                </div>
              </DraggableElement></Link>
              <Link to='/pages/look-cool-2023'>
              <DraggableElement startPosition={{x: -630, y: 1294}}>
                <div className="draggable-item">
                  <img src={LB4} />
                </div>
              </DraggableElement></Link>
              <Link to='/pages/its-an-omos-world'>
              <DraggableElement startPosition={{x: -500, y: 1155}}>
                <div className="draggable-item">
                  <img src={LB5} />
                </div>
              </DraggableElement></Link>
              <Link to='/pages/omo-x-agittaria'>
              <DraggableElement startPosition={{x: -500, y: 864}}>
                <div className="draggable-item">
                  <img src={LB6} />
                </div>
              </DraggableElement>
              </Link>
              {/* Add more DraggableElement components for additional draggable elements */}
            </div>
          )}
        </div>
      ) : page.title === 'technicolor-dreams' ? (
        <TechnicolorDreams/>
      ): page.title === 'its-an-omos-world' ?(
        <OmoW/>
      ): page.title === 'omo-x-agittaria' ?(
        <Omox/>
      ): page.title === 'fleeting-threads' ?(
        <FleetingThreads/>
      ): page.title === 'flowers-dont-dance' ?(
        <Flowers/>
      ): page.title === 'look-&-cool-2023' ?(
        <Look/>
      ): page.title === 'Contact-us' ?(
        <ContactUs/>
      ): page.title === 'Return-Policy' ?(
        <ReturnPolicy/>
      ): page.title === 'Shipping-Policy' ?(
        <Shippingpolicy/>
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
