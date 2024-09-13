import React from 'react'

export const Carousel = () => {
  return (
    <div>
       <section className="my-4">
          <div className="carousel w-full ">
            <div id="slide1" className="carousel-item relative w-full">
              <img  src="https://thumbs.dreamstime.com/b/traveling-car-happy-couple-love-go-cabriolet-car-sunset-time-traveling-car-happy-couple-love-go-cabriolet-car-123687723.jpg?w=768" className="w-full " alt="Happy Traveler 1" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-sm btn-circle">❮</a>
                <a href="#slide2" className="btn btn-sm btn-circle">❯</a>
              </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
            <img src="https://thumbs.dreamstime.com/b/summer-time-car-trip-traveling-men-driving-down-road-scenic-sunset-53598816.jpg?w=768" className="w-full " alt="Happy Traveler 2" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide1" className="btn btn-sm btn-circle">❮</a>
                <a href="#slide3" className="btn btn-sm btn-circle">❯</a>
              </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full">
              <img src="https://thumbs.dreamstime.com/b/happy-hispanic-man-his-new-car-17145871.jpg?w=768" className="w-full " alt="Happy Traveler 3" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide2" className="btn btn-sm btn-circle">❮</a>
                <a href="#slide4" className="btn btn-sm btn-circle">❯</a>
              </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full">
              <img src="https://thumbs.dreamstime.com/b/happy-family-riding-modern-car-traveling-automobile-together-enjoying-road-trip-portrait-laughing-smiling-four-325105013.jpg?w=768" className="w-full " alt="Happy Traveler 4" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide3" className="btn btn-sm btn-circle">❮</a>
                <a href="#slide1" className="btn btn-sm btn-circle">❯</a>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}
