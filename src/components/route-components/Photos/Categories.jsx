import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

import "../../small-components/Menu.css";

import Loading from "../../small-components/Loading";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://shevalek.ru:8443/api/photos")
      .then((res) => res.json())
      .then((data) => {
        const foundCategories = [];
        const categoriesInfo = [];
        for (let photo = 0; photo < data.length; photo++) {
          if (data[photo].keywords === undefined) {
            continue;
          }
          if (
            data[photo].keywords?.description === "Небесная жемчужина" ||
            data[photo].keywords?.description === "Луна в городе" ||
            data[photo].keywords?.description === "Дипломы"
          ) {
            continue;
          }
          if (foundCategories.includes(data[photo].keywords?.description)) {
            continue;
          }
          foundCategories.push(data[photo].keywords?.description);
          categoriesInfo.push({
            category: data[photo].keywords?.description,
            background: data[photo].name,
          });
        }
        categoriesInfo.sort((first, second) => {
          if (first > second) {
            return 1;
          } else {
            return -1;
          }
        });
        const menuCategories = categoriesInfo.map((category, index) => {
          return (
            <div className="menu-item-wrapper" key={index}>
              <NavLink
                to={category.category}
                className="menu-item menu-item-big"
                style={{
                  backgroundImage: `url(/backgrounds/Обложка.${category.category.toLowerCase()}.jpeg)`,
                }}
              >
                <div className="button-name">{category.category}</div>
              </NavLink>
            </div>
          );
        });
        setCategories(menuCategories);
      });
  }, []);

  return categories.length === 0 ? (
    <Loading text="Shevalek.Space" animDur="infinite" />
  ) : (
    <div className="photos-wrapper">
      <Loading text="Shevalek.Space" />
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
        <NavLink className="path-button" to={`/photos/categories`}>
          /Категории
        </NavLink>
      </div>
      <div className="menu only-menu">
        <div className="menu-items">{categories}</div>
      </div>
    </div>
  );
}

export default Categories;
