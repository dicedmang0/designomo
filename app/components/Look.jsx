import React from 'react';
import SC1 from '../Assets/Summer-Capsule.png';
import SC2 from '../Assets/Summer-Capsule-3.png';
import SC3 from '../Assets/Summer-Capsule-2.png';
import LNC1 from '../Assets/Look/LNC-1.png';
import LNC2 from '../Assets/Look/LNC-2.png';
import LNC3 from '../Assets/Look/LNC-3.png';
import LNC4 from '../Assets/Look/LNC-4.png';
import LNC5 from '../Assets/Look/LNC-5.png';
import LNC6 from '../Assets/Look/LNC-6.png';
import LNC7 from '../Assets/Look/LNC-7.png';
import LNC8 from '../Assets/Look/LNC-8.png';
import LNC9 from '../Assets/Look/LNC-9.png';
import LNC10 from '../Assets/Look/LNC-10.png';
import LNC11 from '../Assets/Look/LNC-11.png';
import LNC12 from '../Assets/Look/LNC-12.png';
import LNC13 from '../Assets/Look/LNC-13.png';
import LNC14 from '../Assets/Look/LNC-14.png';
import LNC15 from '../Assets/Look/LNC-15.png';
import LNC16 from '../Assets/Look/LNC-16.png';
import LNC17 from '../Assets/Look/LNC-17.png';
import LNC18 from '../Assets/Look/LNC-18.png';
import LNC19 from '../Assets/Look/LNC-19.png';
import LNC20 from '../Assets/Look/LNC-20.png';
import Slider from 'react-slick';

function Look() {
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
            <img style={{width:'430px', height:'586px'}} src={LNC1} alt="Image 1" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC2} alt="Image 2" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC3} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC4} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC5} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC6} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC7} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC8} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC9} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC10} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC11} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC12} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC13} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC14} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC15} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC16} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC17} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC18} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC19} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={LNC20} alt="Image 3" />
          </div>
        </Slider>
        </div>
        <div className='Lookbook-Title'>
            <h1>2023LOOK & COOL</h1>
        </div>
    </div>
  )
}

export default Look;