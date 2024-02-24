import React, {useRef,useEffect} from 'react';
import SC1 from '../Assets/Summer-Capsule.png';
import SC2 from '../Assets/Summer-Capsule-3.png';
import SC3 from '../Assets/Summer-Capsule-2.png';
import IOW1 from '../Assets/OmoW/IOW-1.png';
import IOW2 from '../Assets/OmoW/IOW-2.png';
import IOW3 from '../Assets/OmoW/IOW-3.png';
import IOW4 from '../Assets/OmoW/IOW-4.png';
import IOW5 from '../Assets/OmoW/IOW-5.png';
import IOW6 from '../Assets/OmoW/IOW-6.png';
import IOW7 from '../Assets/OmoW/IOW-7.png';
import IOW8 from '../Assets/OmoW/IOW-8.png';
import IOW9 from '../Assets/OmoW/IOW-9.png';
import IOW10 from '../Assets/OmoW/IOW-10.png';
import IOW11 from '../Assets/OmoW/IOW-11.png';
import IOW12 from '../Assets/OmoW/IOW-12.png';
import IOW13 from '../Assets/OmoW/IOW-13.png';
import IOW14 from '../Assets/OmoW/IOW-14.png';
import IOW15 from '../Assets/OmoW/IOW-15.png';
import IOW16 from '../Assets/OmoW/IOW-16.png';
import IOW17 from '../Assets/OmoW/IOW-17.png';
import IOW18 from '../Assets/OmoW/IOW-18.png';
import IOW19 from '../Assets/OmoW/IOW-19.png';
import IOW20 from '../Assets/OmoW/IOW-20.png';
import Slider from 'react-slick';

function OmoWorld() {
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
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW1} alt="Image 1" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW2} alt="Image 2" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW3} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW4} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW5} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW6} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW7} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW8} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW9} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW10} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW11} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW12} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW13} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW14} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW15} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW16} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW17} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW18} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW19} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{objectFit:'cover', objectPosition:'center', height:'586px'}} src={IOW20} alt="Image 3" />
          </div>
        </Slider>
        </div>
        <div className='Lookbook-Title'>
            <h1>2022IT’S AN OMO’S WORLD</h1>
        </div>
    </div>
  )
}

export default OmoWorld;