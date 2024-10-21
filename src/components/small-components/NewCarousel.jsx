import { useRef, useEffect, useCallback, useState } from "react";

import dateFilter from "../../functions/dateFilter";

import "./NewCarousel.css";

function NewCarousel({
  photos,
  photoIndex,
  visibility,
  closingFunc,
  choosingFunc,
}) {
  const [currentTranslate, setCurrentTranslate] = useState(null);
  useEffect(() => {
    if (coolCarouselRef.current) {
      const carousel = coolCarouselRef.current.getBoundingClientRect();
      const width = carousel.width;
      setCurrentTranslate(-photoIndex * width);
    }
  }, [visibility, photoIndex]);

  let previousClientX = 0;
  let currentClientX = 0;
  let currentMobileClientX = 0;
  let previousMobileClientX = 0;

  let timeOut;

  const coolCarouselRef = useRef(null);
  const coolItemRef = useRef(null);
  const coolWrapperRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const closeRef = useRef(null);

  const sortedPhotos = dateFilter(photos);

  function mouseMoveWhileDown(target, whileMove) {
    var endMove = function () {
      currentClientX = 0;
      previousClientX = 0;
      currentMobileClientX = 0;
      previousMobileClientX = 0;
      window.removeEventListener("mouseup", endMove);
      window.removeEventListener("mousemove", whileMove);
      window.removeEventListener("touchend", endMove);
      window.removeEventListener("touchmove", whileMove);
    };

    target.addEventListener("mousedown", function (event) {
      event.stopPropagation(); // remove if you do want it to propagate ..
      previousClientX = event.clientX;
      window.addEventListener("mousemove", whileMove);
      window.addEventListener("mouseup", endMove);
    });
    target.addEventListener("touchstart", function (event) {
      event.stopPropagation(); // remove if you do want it to propagate ..
      previousClientX = event.clientX;
      previousMobileClientX = event.touches[0].clientX;
      window.addEventListener("touchmove", whileMove);
      window.addEventListener("touchend", endMove);
    });
  }

  useEffect(() => {
    if (coolCarouselRef.current) {
      mouseMoveWhileDown(coolCarouselRef.current, (event) => {
        currentClientX = event.clientX;
        if (previousMobileClientX !== 0) {
          currentMobileClientX = event.touches[0].clientX;
        }

        const carousel = coolCarouselRef.current.getBoundingClientRect();
        const width = carousel.width;
        const items = document.getElementsByClassName("cool-carousel-item");
        if (previousClientX > currentClientX) {
          if (previousClientX - currentClientX > 100) {
            if (currentTranslate === -(Array.from(items).length - 1) * width) {
              Array.from(items).forEach((item) => {
                item.style.transform = `translateX(0px)`;
              });
              setCurrentTranslate(0);
            } else {
              Array.from(items).forEach((item) => {
                item.style.transform = `translateX(${
                  currentTranslate - width
                }px)`;
              });
              setCurrentTranslate(currentTranslate - width);
            }
          }
        }
        if (previousClientX < currentClientX) {
          if (currentClientX - previousClientX > 100) {
            if (currentTranslate === 0) {
              Array.from(items).forEach((item) => {
                item.style.transform = `translateX(-${
                  (Array.from(items).length - 1) * width
                }px)`;
              });
              setCurrentTranslate(-(Array.from(items).length - 1) * width);
            } else {
              Array.from(items).forEach((item) => {
                item.style.transform = `translateX(${
                  currentTranslate + width
                }px)`;
              });
              setCurrentTranslate(currentTranslate + width);
            }
          }
        }
        if (previousMobileClientX > currentMobileClientX) {
          if (previousMobileClientX - currentMobileClientX > 100) {
            if (currentTranslate === -(Array.from(items).length - 1) * width) {
              Array.from(items).forEach((item) => {
                item.style.transform = `translateX(0px)`;
              });
              setCurrentTranslate(0);
            } else {
              Array.from(items).forEach((item) => {
                item.style.transform = `translateX(${
                  currentTranslate - width
                }px)`;
              });
              setCurrentTranslate(currentTranslate - width);
            }
          }
        }
        if (previousMobileClientX < currentMobileClientX) {
          if (currentMobileClientX - previousMobileClientX > 100) {
            if (currentTranslate === 0) {
              Array.from(items).forEach((item) => {
                item.style.transform = `translateX(-${
                  (Array.from(items).length - 1) * width
                }px)`;
              });
              setCurrentTranslate(-(Array.from(items).length - 1) * width);
            } else {
              Array.from(items).forEach((item) => {
                item.style.transform = `translateX(${
                  currentTranslate + width
                }px)`;
              });
              setCurrentTranslate(currentTranslate + width);
            }
          }
        }
      });
    }
  }, [currentTranslate]);

  const handleArrows = useCallback(
    (event) => {
      if (event.code === "ArrowLeft") {
        const carousel = coolCarouselRef.current.getBoundingClientRect();
        const width = carousel.width;
        const items = document.getElementsByClassName("cool-carousel-item");
        if (currentTranslate === 0) {
          Array.from(items).forEach((item) => {
            item.style.transform = `translateX(-${
              (Array.from(items).length - 1) * width
            }px)`;
          });
          setCurrentTranslate(-(Array.from(items).length - 1) * width);
        } else {
          Array.from(items).forEach((item) => {
            item.style.transform = `translateX(${currentTranslate + width}px)`;
          });
          setCurrentTranslate(currentTranslate + width);
        }
      }
      if (event.code === "ArrowRight") {
        const carousel = coolCarouselRef.current.getBoundingClientRect();
        const width = carousel.width;
        const items = document.getElementsByClassName("cool-carousel-item");
        if (currentTranslate === -(Array.from(items).length - 1) * width) {
          Array.from(items).forEach((item) => {
            item.style.transform = `translateX(0px)`;
          });
          setCurrentTranslate(0);
        } else {
          Array.from(items).forEach((item) => {
            item.style.transform = `translateX(${currentTranslate - width}px)`;
          });
          setCurrentTranslate(currentTranslate - width);
        }
      }
    },
    [photoIndex, currentTranslate]
  );
  useEffect(() => {
    document.addEventListener("keydown", handleArrows);
    return () => {
      document.removeEventListener("keydown", handleArrows);
    };
  }, [photoIndex, currentTranslate]);

  const handleClick = useCallback((event) => {
    const position = coolCarouselRef.current.getBoundingClientRect();
    const left = position.left;
    const right = position.right;
    const top = position.top;
    const bottom = position.bottom;
    const x = event.clientX;
    const y = event.clientY;
    if (x < left || x > right) {
      clearTimeout(timeOut);
      closingFunc("hidden");
      choosingFunc(0);
      setCurrentTranslate(0);
    }
    if (y > bottom || y < top) {
      clearTimeout(timeOut);
      closingFunc("hidden");
      choosingFunc(0);
      setCurrentTranslate(0);
    }
  });
  useEffect(() => {
    if (coolCarouselRef.current) {
      document.addEventListener("click", handleClick);
      return () => {
        document.removeEventListener("click", handleClick);
      };
    }
  }, [photoIndex, visibility]);

  useEffect(() => {
    if (coolWrapperRef.current) {
      timeOut = setTimeout(() => {
        leftArrowRef.current.style.opacity = "0";
        rightArrowRef.current.style.opacity = "0";
        closeRef.current.style.opacity = "0";
        coolWrapperRef.current.style.cursor = "none";
      }, 3000);
    }
  }, [photoIndex, visibility]);

  const handleMouse = useCallback(() => {
    clearTimeout(timeOut);
    leftArrowRef.current.style.opacity = "1";
    rightArrowRef.current.style.opacity = "1";
    closeRef.current.style.opacity = "1";
    coolWrapperRef.current.style.cursor = "auto";
    timeOut = setTimeout(() => {
      leftArrowRef.current.style.opacity = "0";
      rightArrowRef.current.style.opacity = "0";
      closeRef.current.style.opacity = "0";
      coolWrapperRef.current.style.cursor = "none";
    }, 3000);
  }, []);
  useEffect(() => {
    if (coolWrapperRef.current) {
      coolWrapperRef.current.addEventListener("mousemove", handleMouse);
    }
  }, [photoIndex, visibility]);

  return visibility === "hidden" ? (
    <></>
  ) : (
    <div className="cool-carousel-wrapper" ref={coolWrapperRef}>
      <button
        className="cool-carousel-close"
        onClick={() => {
          clearTimeout(timeOut);
          closingFunc("hidden");
          choosingFunc(0);
          setCurrentTranslate(0);
        }}
        ref={closeRef}
      >
        X
      </button>
      <button
        className="cool-carousel-arrow cool-arrow-left"
        onClick={() => {
          const carousel = coolCarouselRef.current.getBoundingClientRect();
          const width = carousel.width;
          const items = document.getElementsByClassName("cool-carousel-item");
          if (currentTranslate === 0) {
            Array.from(items).forEach((item) => {
              item.style.transform = `translateX(-${
                (Array.from(items).length - 1) * width
              }px)`;
            });
            setCurrentTranslate(-(Array.from(items).length - 1) * width);
          } else {
            Array.from(items).forEach((item) => {
              item.style.transform = `translateX(${
                currentTranslate + width
              }px)`;
            });
            setCurrentTranslate(currentTranslate + width);
          }
        }}
        ref={leftArrowRef}
      >
        {"<"}
      </button>
      <div className="cool-carousel" ref={coolCarouselRef}>
        {sortedPhotos.map((photo, index) => {
          if (coolCarouselRef.current) {
            const carousel = coolCarouselRef.current.getBoundingClientRect();
            const width = carousel.width;
            return (
              <div
                className="cool-carousel-item"
                key={index}
                ref={coolItemRef}
                style={{ transform: `translateX(-${photoIndex * width}px)` }}
              >
                <img
                  src={`/images/${photo.name}`}
                  className="cool-carousel-img"
                />
              </div>
            );
          }
        })}
      </div>
      <button
        className="cool-carousel-arrow cool-arrow-right"
        onClick={() => {
          const carousel = coolCarouselRef.current.getBoundingClientRect();
          const width = carousel.width;
          const items = document.getElementsByClassName("cool-carousel-item");
          if (currentTranslate === -(Array.from(items).length - 1) * width) {
            Array.from(items).forEach((item) => {
              item.style.transform = `translateX(0px)`;
            });
            setCurrentTranslate(0);
          } else {
            Array.from(items).forEach((item) => {
              item.style.transform = `translateX(${
                currentTranslate - width
              }px)`;
            });
            setCurrentTranslate(currentTranslate - width);
          }
        }}
        ref={rightArrowRef}
      >
        {">"}
      </button>
    </div>
  );
}

export default NewCarousel;
