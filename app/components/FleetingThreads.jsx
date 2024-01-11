import React, { useRef,useEffect } from 'react';
import SC1 from '../Assets/Summer-Capsule.png';
import SC2 from '../Assets/Summer-Capsule-3.png';
import SC3 from '../Assets/Summer-Capsule-2.png';
import FT1 from '../Assets/Fleeting/FT-1.png';
import FT2 from '../Assets/Fleeting/FT-2.png';
import FT3 from '../Assets/Fleeting/FT-3.png';
import FT4 from '../Assets/Fleeting/FT-4.png';
import FT5 from '../Assets/Fleeting/FT-5.png';
import FT6 from '../Assets/Fleeting/FT-6.png';
import FT7 from '../Assets/Fleeting/FT-7.png';
import FT8 from '../Assets/Fleeting/FT-8.png';
import FT9 from '../Assets/Fleeting/FT-9.png';
import FT10 from '../Assets/Fleeting/FT-10.png';
import FT11 from '../Assets/Fleeting/FT-11.png';
import FT12 from '../Assets/Fleeting/FT-12.png';
import FT13 from '../Assets/Fleeting/FT-13.png';
import FT14 from '../Assets/Fleeting/FT-14.png';
import FT15 from '../Assets/Fleeting/FT-15.png';
import FT16 from '../Assets/Fleeting/FT-16.png';
import FT17 from '../Assets/Fleeting/FT-17.png';
import FT18 from '../Assets/Fleeting/FT-18.png';
import FT19 from '../Assets/Fleeting/FT-19.png';
import FT20 from '../Assets/Fleeting/FT-20.png';
import Slider from 'react-slick';

function FleetingThreads() {
  const sliderRef = useRef();
  // Function to handle scroll
  useEffect(() => {
    // Function to handle scroll
    const handleScroll = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        // Scroll up
        sliderRef.current.slickPrev();
      } else {
        // Scroll down
        sliderRef.current.slickNext();
      }
    };

    // Get the slider's DOM node
    const slider = sliderRef.current;
    const sliderNode = slider && slider.innerSlider && slider.innerSlider.list;

    if (sliderNode) {
      sliderNode.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (sliderNode) {
        sliderNode.removeEventListener('wheel', handleScroll);
      }
    };
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: false, // Show navigation arrows
    prevArrow: <button className="slick-prev">Previous</button>,
    nextArrow: <button className="slick-next">Next</button>,
    responsive: [
      {
        breakpoint: 768, // Apply this configuration for screens <= 768px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className='Summer-Capsule-Container'>
        <div className='Lookbook-Image-Carouesel'>
        <Slider ref={sliderRef} {...settings}>
        <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT1} alt="Image 1" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT2} alt="Image 2" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT3} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT4} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT5} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT6} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT7} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT8} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT9} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT10} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT11} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT12} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT13} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT14} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT15} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT16} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT17} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT18} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT19} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FT20} alt="Image 3" />
          </div>
        </Slider>
        </div>
        <div className='Lookbook-Title'>
            <h1>2023FLEETING THREADS </h1>
        </div>
    </div>
  )
}

export default FleetingThreads;