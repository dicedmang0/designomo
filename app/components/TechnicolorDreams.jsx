import React from 'react';
import SC1 from '../Assets/Summer-Capsule.png';
import SC2 from '../Assets/Summer-Capsule-3.png';
import SC3 from '../Assets/Summer-Capsule-2.png';
import TC1 from '../Assets/Technicolor/TC-1.png';
import TC2 from '../Assets/Technicolor/TC-2.png';
import TC3 from '../Assets/Technicolor/TC-3.png';
import TC4 from '../Assets/Technicolor/TC-4.png';
import TC5 from '../Assets/Technicolor/TC-5.png';
import TC6 from '../Assets/Technicolor/TC-6.png';
import TC7 from '../Assets/Technicolor/TC-7.png';
import TC8 from '../Assets/Technicolor/TC-8.png';
import TC9 from '../Assets/Technicolor/TC-9.png';
import TC10 from '../Assets/Technicolor/TC-10.png';
import TC11 from '../Assets/Technicolor/TC-11.png';
import TC12 from '../Assets/Technicolor/TC-12.png';
import TC13 from '../Assets/Technicolor/TC-13.png';
import TC14 from '../Assets/Technicolor/TC-14.png';
import TC15 from '../Assets/Technicolor/TC-15.png';
import TC16 from '../Assets/Technicolor/TC-16.png';
import TC17 from '../Assets/Technicolor/TC-17.png';
import TC18 from '../Assets/Technicolor/TC-18.png';
import TC19 from '../Assets/Technicolor/TC-19.png';
import TC20 from '../Assets/Technicolor/TC-20.png';
import Slider from 'react-slick';

function TechnicolorDreams() {
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
            <img style={{width:'430px', height:'586px'}} src={TC1} alt="Image 1" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC2} alt="Image 2" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC3} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC4} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC5} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC6} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC7} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC8} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC9} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC10} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC11} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC12} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC13} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC14} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC15} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC16} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC17} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC18} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC19} alt="Image 3" />
          </div>
          <div className='Lookbook-img'>
            <img style={{width:'430px', height:'586px'}} src={TC20} alt="Image 3" />
          </div>
        </Slider>
        </div>
        <div className='Lookbook-Title'>
            <h1>2023TECHNICOLOR</h1>
        </div>
    </div>
  )
}

export default TechnicolorDreams;