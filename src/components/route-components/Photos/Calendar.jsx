import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

import "../../small-components/Menu.css";

import Loading from "../../small-components/Loading";
import Gallery from "../../small-components/Gallery";
import NewCarousel from "../../small-components/NewCarousel";

function Calendar() {
  const [album, setAlbum] = useState([]);
  const [carousel, setCarousel] = useState("hidden");
  const [carouselIndex, setCarouselIndex] = useState(null);
  const [years, setYears] = useState([]);

  useEffect(() => {
    fetch('https://shevalek.space:8443/api/photos?category="Луна в городе"')
      .then((res) => res.json())
      .then((data) => setAlbum(data));
  }, []);

  useEffect(() => {
    fetch("https://shevalek.space:8443/api/photos")
      .then((res) => res.json())
      .then((data) => {
        const foundYears = [];
        for (let photo = 0; photo < data.length; photo++) {
          if (data[photo].date === undefined) {
            continue;
          }

          if (foundYears.includes(data[photo].date.year)) {
            continue;
          }
          foundYears.push(data[photo].date.year);
        }
        foundYears.sort((first, second) => {
          if (Number(first) > Number(second)) {
            return 1;
          } else {
            return -1;
          }
        });
        const menuYears = foundYears.map((year, index) => {
          return (
            <div className="menu-item-wrapper" key={index}>
              <NavLink to={year} className="menu-item menu-item-small">
                <div className="button-name">{year}</div>
              </NavLink>
            </div>
          );
        });
        setYears(menuYears);
      });
  }, []);

  return album.length === 0 ? (
    <Loading text="Shevalek.Space" animDur="infinite" />
  ) : (
    <div className="photos-wrapper">
      <Loading
        text="Shevalek.Space"
        color={carousel === "hidden" ? "white" : "transparent"}
      />
      <div className="path">
        <NavLink className="go-back" to={`/photos`} path="relative">
          {"<"}
        </NavLink>
        <NavLink className="path-button" to="/">
          Shevalek.Space
        </NavLink>
        <NavLink className="path-button" to={`/photos`}>
          /Фото
        </NavLink>
        <NavLink className="path-button" to={`/photos/calendar`}>
          /Календарь
        </NavLink>
      </div>
      <div className="menu">
        <div className="menu-items">{years}</div>
      </div>
      <Gallery
        photos={album}
        openCarousel={setCarousel}
        choosingFunc={setCarouselIndex}
        title="Луна в городе"
      />
      {/* <NewCarousel
        visibility={carousel}
        photos={album}
        photoIndex={carouselIndex}
        choosingFunc={setCarouselIndex}
        closingFunc={setCarousel}
      /> */}
    </div>
  );
}

export default Calendar;
