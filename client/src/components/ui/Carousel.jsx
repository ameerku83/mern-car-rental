import React from 'react'
import audiq7 from "../../asets/images/audi q7.png"
import bmwi4 from "../../asets/images/BMW_i4_IMG_6695-removebg-preview 1.png"
import bmwx5 from "../../asets/images/bmw_x5-removebg-preview 2.png"
import bmwx3 from "../../asets/images/BMW-X3-x.png"
//import prev from "../../asets/images/images-removebg-preview 1.png"
export const Carousel = () => {
    
  return (
    <div>
        <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img
      src="https://www.hdcarwallpapers.com/walls/2023_bmw_m2_001_4k-HD.jpg"
      className=" w-1/2 object-contain" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <img
      src={bmwx3}
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
    <img
      src={audiq7}
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full">
    <img
      src={bmwi4}
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
    </div>
  )
}

