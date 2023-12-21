import React from 'react';
import SC1 from '../Assets/Summer-Capsule.png';
import SC2 from '../Assets/Summer-Capsule-3.png';
import SC3 from '../Assets/Summer-Capsule-2.png';
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
            <img src={SC1} alt="Image 1" />
          </div>
          <div className='Lookbook-img'>
            <img src={SC2} alt="Image 2" />
          </div>
          <div className='Lookbook-img'>
            <img src={SC3} alt="Image 2" />
          </div>
        </Slider>
        </div>
        <div className='Lookbook-Title'>
            <h1>2023LOOK&COOL</h1>
        </div>
    </div>
  )
}

export default Look;