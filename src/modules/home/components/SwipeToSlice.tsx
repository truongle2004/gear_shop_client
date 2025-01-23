import React from 'react'
import Slider from 'react-slick'

function SwipeToSlide({ children }: { children: React.ReactNode }) {
  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 5,
    autoplay: true,
    speed: 600,
    autoplaySpeed: 6000,
    cssEase: 'linear',
    swipeToSlide: true,
    afterChange: function (index: number) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      )
    }
  }
  return (
    <div className="slider-container">
      <Slider {...settings}>{children}</Slider>
    </div>
  )
}

export default SwipeToSlide
