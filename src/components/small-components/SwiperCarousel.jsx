import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useCallback, useEffect, useRef } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "./SwiperCarousel.css";

let swiperTimeout = null;

export default function SwiperCarousel({
  photos,
  chosenPhoto,
  setChosenPhoto,
}) {
  const swiperRef = useRef(null);
  const media = photos.map((photo, index) => {
    return (
      <SwiperSlide key={index + "SwiperSlide"}>
        <img
          src={"/images/" + photo.name}
          className="swiper-carousel-slide-img"
          loading="lazy"
        ></img>
      </SwiperSlide>
    );
  });

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(chosenPhoto, 0);
    }
  }, [chosenPhoto]);

  const timerCallback = useCallback(() => {
    clearTimeout(swiperTimeout);
    const closingSwiperButton = document.querySelector(
      ".close-swiper-carousel"
    );
    const leftSwiperArrow = document.querySelector(".swiper-button-prev");
    const rightSwiperArrow = document.querySelector(".swiper-button-next");

    closingSwiperButton.classList.remove("disappeared-button");
    leftSwiperArrow.classList.remove("disappeared-button");
    rightSwiperArrow.classList.remove("disappeared-button");

    swiperTimeout = setTimeout(() => {
      closingSwiperButton.classList.add("disappeared-button");
      leftSwiperArrow.classList.add("disappeared-button");
      rightSwiperArrow.classList.add("disappeared-button");
    }, 3000);
  });

  useEffect(() => {
    const swiperWrapper = document.querySelector(".swiper-carousel-wrapper");
    if (swiperWrapper) {
      timerCallback();
      swiperWrapper.addEventListener("mousemove", timerCallback);
      swiperWrapper.addEventListener("click", timerCallback);
    }
  }, []);
  return (
    <div className="swiper-carousel-wrapper swiper-carousel-wrapper-closed">
      <button
        className="close-swiper-carousel"
        onClick={() => {
          const swiperCarousel = document.querySelector(
            ".swiper-carousel-wrapper"
          );
          const closingSwiperCarouselButton = document.querySelector(
            ".close-swiper-carousel"
          );
          if (swiperCarousel) {
            swiperCarousel.classList.add("swiper-carousel-wrapper-closed");
            closingSwiperCarouselButton.classList.add(
              "disappeared-close-button"
            );
          }
          document.body.classList.remove("body-no-scroll");
          setChosenPhoto(0);
        }}
      >
        <div className="first-line-for-close"></div>
        <div className="second-line-for-close"></div>
      </button>
      <Swiper modules={[Navigation]} navigation ref={swiperRef}>
        {media}
      </Swiper>
    </div>
  );
}
