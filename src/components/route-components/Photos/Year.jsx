import { useState, useEffect } from "react";
import { useLocation, NavLink, useParams } from "react-router-dom";

import Loading from "../../small-components/Loading";
import Gallery from "../../small-components/Gallery";
import NewCarousel from "../../small-components/NewCarousel";

function Year() {
  const [album, setAlbum] = useState([]);
  const [carousel, setCarousel] = useState("hidden");
  const [carouselIndex, setCarouselIndex] = useState(null);

  const params = useParams();

  const location = useLocation();

  useEffect(() => {
    fetch(`https://shevalek.space:8443/api/photos?year="${params.year}"`)
      .then((res) => res.json())
      .then((data) => setAlbum(data));
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
        <NavLink className="go-back" to={`/photos/calendar`} path="relative">
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
        <NavLink className="path-button" to={`${location.pathname}`}>
          /{params.year}
        </NavLink>
      </div>
      <Gallery
        photos={album}
        openCarousel={setCarousel}
        choosingFunc={setCarouselIndex}
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

export default Year;
