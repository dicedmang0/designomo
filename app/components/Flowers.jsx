import React from 'react';
import SC1 from '../Assets/Summer-Capsule.png';
import SC2 from '../Assets/Summer-Capsule-3.png';
import SC3 from '../Assets/Summer-Capsule-2.png';
import FDD1 from '../Assets/Flowers/FDD-1.png';
import FDD2 from '../Assets/Flowers/FDD-2.png';
import FDD3 from '../Assets/Flowers/FDD-3.png';
import FDD4 from '../Assets/Flowers/FDD-4.png';
import FDD5 from '../Assets/Flowers/FDD-5.png';
import FDD6 from '../Assets/Flowers/FDD-6.png';
import FDD7 from '../Assets/Flowers/FDD-7.png';
import FDD8 from '../Assets/Flowers/FDD-8.png';
import FDD9 from '../Assets/Flowers/FDD-9.png';
import FDD10 from '../Assets/Flowers/FDD-10.png';
import FDD11 from '../Assets/Flowers/FDD-11.png';
import FDD12 from '../Assets/Flowers/FDD-12.png';
import FDD13 from '../Assets/Flowers/FDD-13.png';
import FDD14 from '../Assets/Flowers/FDD-14.png';
import FDD15 from '../Assets/Flowers/FDD-15.png';
import FDD16 from '../Assets/Flowers/FDD-16.png';
import FDD17 from '../Assets/Flowers/FDD-17.png';
import FDD18 from '../Assets/Flowers/FDD-18.png';
import FDD19 from '../Assets/Flowers/FDD-19.png';
import FDD20 from '../Assets/Flowers/FDD-20.png';
import Slider from 'react-slick';

function Flowers() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
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
        <Slider {...settings}>
        <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD1} alt="Image 1" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD2} alt="Image 2" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD3} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD4} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD5} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD6} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD7} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD8} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD9} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD10} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD11} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD12} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD13} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD14} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD15} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD16} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD17} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD18} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD19} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={FDD20} alt="Image 3" />
          </div>
        </Slider>
        </div>
        <div className='Lookbook-Title'>
            <h1>2023SUMMER CAPSULE</h1>
        </div>
    </div>
  )
}

export default Flowers;