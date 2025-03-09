import { useMemo, useEffect, useCallback } from "react";
import "./LightCarousel.css";

let carouselButtonsTimeout = null;

export default function LightCarousel({ photos, chosenPhoto, setChosenPhoto }) {
  const media = useMemo(() => {
    return photos.map((photo, index) => {
      return (
        <div
          className="light-carousel-item-wrapper"
          key={index + "LightCarousel"}
          id={`light-carousel-img-${index}`}
        >
          <img
            src={"/images/" + photo.name}
            loading="lazy"
            className="light-carousel-item-img"
          ></img>
        </div>
      );
    });
  }, []);

  useEffect(() => {
    const neededPhoto = document.getElementById(
      `light-carousel-img-${chosenPhoto}`
    );
    if (neededPhoto) {
      neededPhoto.scrollIntoView();
    }
  }, [chosenPhoto]);

  const timeoutCallback = useCallback(() => {
    clearTimeout(carouselButtonsTimeout);
    const closingLightCarouselButton = document.querySelector(
      ".close-light-carousel"
    );
    if (closingLightCarouselButton) {
      closingLightCarouselButton.style.opacity = "1";
    }

    carouselButtonsTimeout = setTimeout(() => {
      const closingLightCarouselButton = document.querySelector(
        ".close-light-carousel"
      );
      if (closingLightCarouselButton) {
        closingLightCarouselButton.style.opacity = "0";
      }
    }, 2000);
  }, [chosenPhoto]);

  useEffect(() => {
    const lightCarousel = document.querySelector(".light-carousel-wrapper");
    if (lightCarousel) {
      lightCarousel.addEventListener("click", timeoutCallback);
      lightCarousel.addEventListener("mousemove", timeoutCallback);
    }
  }, []);

  return (
    <article className="light-carousel-wrapper light-carousel-wrapper-closed">
      <button
        className="close-light-carousel disappeared-close-button"
        onClick={() => {
          const lightCarousel = document.querySelector(
            ".light-carousel-wrapper"
          );
          const closingLightCarouselButton = document.querySelector(
            ".close-light-carousel"
          );
          if (lightCarousel) {
            lightCarousel.classList.add("light-carousel-wrapper-closed");
            closingLightCarouselButton.classList.add(
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
      {media}
    </article>
  );
}
