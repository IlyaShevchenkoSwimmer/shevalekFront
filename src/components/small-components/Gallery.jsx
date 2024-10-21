import { useCallback, useEffect, useRef, useState } from "react";
import "./Gallery.css";
import dateFilter from "../../functions/dateFilter.jsx";

function Gallery({ photos, openCarousel, choosingFunc, title }) {
  const [orientation, setOrientation] = useState("vert-item");

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

  photos.forEach((photo) => {
    let img = new Image();

    img.onload = function () {
      let width = img.width;
      let height = img.height;

      if (width > height) {
        setOrientation("horizontal-item");
      }
    };

    img.src = "/images/" + photo.name;
  });

  const filteredPhotos = dateFilter(photos);
  const media = filteredPhotos.map((photo, index) => {
    return (
      <button
        className={`gallery-item ${orientation}`}
        onClick={() => {
          openCarousel("visible");
          choosingFunc(index);
        }}
        ref={itemRef}
        key={index}
      >
        <img src={"/images/" + photo.name} className={`gallery-img `}></img>
      </button>
    );
  });
  return (
    <>
      <div className="gallery" ref={galleryRef}>
        {title ? <h2>{title}</h2> : <></>}
        {media}
      </div>
    </>
  );
}

export default Gallery;
