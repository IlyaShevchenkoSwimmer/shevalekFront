import { useCallback, useEffect, useRef, useState } from "react";
import "./Gallery.css";
import dateFilter from "../../functions/dateFilter.jsx";
import LightCarousel from "./LightCarousel.jsx";

function Gallery({ photos, openCarousel, choosingFunc, title }) {
  const [orientation, setOrientation] = useState("vert-item");
  const [chosenPhoto, setChosenPhoto] = useState(0);
  // const [page, setPage] = useState(1);

  const itemRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (galleryRef.current && itemRef.current) {
      const targets = document.getElementsByClassName("gallery-item");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const child = entry.target.children[0];
            if (entry.isIntersecting) {
              entry.target.classList.add("gallery-item-inView");
              child.classList.add("gallery-img-inView");
            }

            if (!entry.isIntersecting) {
              entry.target.classList.remove("gallery-item-inView");
              child.classList.remove("gallery-img-inView");
            }
          });
        },
        { threshold: 0.8 }
      );

      for (let i = 0; i < targets.length; i++) {
        observer.observe(targets[i]);
      }
    }
  }, [galleryRef.current]);

  // const handleScroll = useCallback(() => {
  //   const body = document.querySelector("body");
  //   if (body.getBoundingClientRect().bottom < window.innerHeight + 1) {
  //     setPage(page + 1);
  //   }
  //   //console.log(body.getBoundingClientRect().bottom, window.innerHeight);
  // }, [galleryRef.current, page]);

  // useEffect(() => {
  //   if (galleryRef.current) {
  //     document.addEventListener("scroll", handleScroll);
  //   }
  //   if (!galleryRef.current) {
  //     return document.removeEventListener("scroll", handleScroll);
  //   }
  // }, [galleryRef.current, page]);

  photos.forEach((photo) => {
    if (photo.width > photo.height && orientation !== "horizontal-item") {
      setOrientation("horizontal-item");
    }
  });

  const filteredPhotos = dateFilter(photos);

  const showingPhotos = filteredPhotos.map((photo, index) => {
    // if (index > page * 50) {
    //   return;
    // }
    return (
      <button
        className={`gallery-item ${orientation}`}
        onClick={() => {
          const lightCarousel = document.querySelector(
            ".light-carousel-wrapper"
          );
          const closingLightCarouselButton = document.querySelector(
            ".close-light-carousel"
          );
          if (lightCarousel) {
            lightCarousel.classList.remove("light-carousel-wrapper-closed");
            closingLightCarouselButton.classList.remove(
              "disappeared-close-button"
            );
          }
          document.body.classList.add("body-no-scroll");
          setChosenPhoto(index);
        }}
        ref={itemRef}
        key={index}
      >
        <img
          src={"/images/" + photo.name}
          className={`gallery-img `}
          loading="lazy"
        ></img>
      </button>
    );
  });

  return (
    <>
      <div className="gallery" ref={galleryRef}>
        {title ? <h2>{title}</h2> : <></>}
        {showingPhotos}
      </div>
      {/* <SwiperCarousel
        photos={filteredPhotos}
        chosenPhoto={chosenPhoto}
        setChosenPhoto={setChosenPhoto}
      /> */}
      <LightCarousel
        photos={filteredPhotos}
        chosenPhoto={chosenPhoto}
        setChosenPhoto={setChosenPhoto}
      />
    </>
  );
}

export default Gallery;
