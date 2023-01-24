/* eslint-disable array-callback-return */
import React from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function App({ pdData }) {
  const [swiperRef, setSwiperRef] = useState([]);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  return (
    <React.Fragment>
      <div className="arrowsSet">
        <button className="arrowLeft" onClick={prevHandler}></button>
        <button className="arrowRight" onClick={nextHandler}></button>
      </div>
      <Swiper
        className="swiper"
        loop={true}
        slidesPerView={1}
        navigation
        onSwiper={swiper => setSwiperRef(swiper)}
      >
        {pdData.images?.map((image, index) => {
          <SwiperSlide className="swiper-slide">
            <img
              key={index}
              src={image}
              alt="thumbNail"
              width={400}
              height={400}
            />
          </SwiperSlide>;
        })}
      </Swiper>
    </React.Fragment>
  );
}
