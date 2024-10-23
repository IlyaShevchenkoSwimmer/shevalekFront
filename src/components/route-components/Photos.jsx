import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Photos.css";
import "../small-components/Path.css";
import "../small-components/Menu.css";

import Loading from "../small-components/Loading";
import Gallery from "../small-components/Gallery";
import NewCarousel from "../small-components/NewCarousel";

function Photos() {
  const [album, setAlbum] = useState([]);
  const [carousel, setCarousel] = useState("hidden");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const location = useLocation();

  useEffect(() => {
    fetch(
      'https://shevalek.space:8443/api/photos?category="Небесная жемчужина"'
    )
      .then((res) => res.json())
      .then((data) => setAlbum(data));
  }, []);

  return album.length === 0 ? (
    <Loading text="Shevalek.Space" animDur="infinite" />
  ) : location.pathname === "/photos/" || location.pathname === "/photos" ? (
    <div className="photos-wrapper">
      <Loading
        text="Shevalek.Space"
        color={carousel === "hidden" ? "white" : "transparent"}
      />
      <div className="path">
        <NavLink className="go-back" to={`/`} path="relative">
          {"<"}
        </NavLink>
        <NavLink className="path-button" to="/">
          Shevalek.Space
        </NavLink>
        <NavLink className="path-button" to={`/photos`}>
          /Фото
        </NavLink>
      </div>
      <div className="menu">
        <div className="menu-items">
          <div className="menu-item-wrapper">
            <NavLink to="calendar" className="menu-item menu-item-small">
              <div className="button-name">Календарь</div>
            </NavLink>
          </div>
          <div className="menu-item-wrapper">
            <NavLink to="categories" className="menu-item menu-item-small">
              <div className="button-name">Категории</div>
            </NavLink>
          </div>
        </div>
      </div>
      <Gallery
        photos={album}
        openCarousel={setCarousel}
        choosingFunc={setCarouselIndex}
        title="Небесная жемчужина"
      />
      <NewCarousel
        photos={album}
        photoIndex={carouselIndex}
        visibility={carousel}
        closingFunc={setCarousel}
        choosingFunc={setCarouselIndex}
      />
    </div>
  ) : (
    <Outlet />
  );
}

export default Photos;
