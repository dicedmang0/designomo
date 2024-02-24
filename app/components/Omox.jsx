import React, {useEffect, useRef} from 'react';
import SC1 from '../Assets/Summer-Capsule.png';
import SC2 from '../Assets/Summer-Capsule-3.png';
import SC3 from '../Assets/Summer-Capsule-2.png';
import OX1 from '../Assets/Omox/OX-1.png';
import OX2 from '../Assets/Omox/OX-2.png';
import OX3 from '../Assets/Omox/OX-3.png';
import OX4 from '../Assets/Omox/OX-4.png';
import OX5 from '../Assets/Omox/OX-5.png';
import OX6 from '../Assets/Omox/OX-6.png';
import OX7 from '../Assets/Omox/OX-7.png';
import OX8 from '../Assets/Omox/OX-8.png';
import OX9 from '../Assets/Omox/OX-9.png';
import OX10 from '../Assets/Omox/OX-10.png';
import OX11 from '../Assets/Omox/OX-11.png';
import OX12 from '../Assets/Omox/OX-12.png';
import OX13 from '../Assets/Omox/OX-13.png';
import OX14 from '../Assets/Omox/OX-14.png';
import OX15 from '../Assets/Omox/OX-15.png';
import OX16 from '../Assets/Omox/OX-16.png';
import OX17 from '../Assets/Omox/OX-17.png';
import OX18 from '../Assets/Omox/OX-18.png';
import OX19 from '../Assets/Omox/OX-19.png';
import OX20 from '../Assets/Omox/OX-20.png';
import Slider from 'react-slick';

function Omox() {
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
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
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
            <img style={{width:'430px', height:'586px'}} src={OX1} alt="Image 1" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX2} alt="Image 2" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX3} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX4} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX5} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX6} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX7} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX8} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX9} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX10} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX11} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX12} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX13} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX14} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX15} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX16} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX17} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX18} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX19} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={OX20} alt="Image 3" />
          </div>
        </Slider>
        </div>
        <div className='Lookbook-Title'>
            <h1>2023OMO X AGITTARIA</h1>
        </div>
    </div>
  )
}

export default Omox;