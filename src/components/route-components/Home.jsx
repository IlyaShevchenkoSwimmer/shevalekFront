import { NavLink } from "react-router-dom";

import "../small-components/Menu.css";
import "./Home.css";

import Loading from "../small-components/Loading";

function Home() {
  return (
    <div className="home-wrapper">
      <Loading text="Shevalek.Space" />
      <div className="menu only-menu">
        <div className="menu-items">
          <div className="menu-item-wrapper">
            <NavLink
              to="photos"
              className="menu-item menu-item-big"
              style={{ backgroundImage: "url(/backgrounds/Обложка.фото.jpeg)" }}
            >
              <div className="button-name">Фото</div>
            </NavLink>
          </div>
          <div className="menu-item-wrapper">
            <NavLink
              to="video"
              className="menu-item menu-item-big"
              style={{
                backgroundImage: "url(/backgrounds/Обложка.видео.jpeg)",
              }}
            >
              <div className="button-name">Видео</div>
            </NavLink>
          </div>
          <div className="menu-item-wrapper">
            <NavLink
              to="music"
              className="menu-item menu-item-big"
              style={{
                backgroundImage: "url(/backgrounds/Обложка.музыка.jpeg)",
              }}
            >
              <div className="button-name">Музыка</div>
            </NavLink>
          </div>
          <div className="menu-item-wrapper">
            <NavLink
              to="notes"
              className="menu-item menu-item-big"
              style={{
                backgroundImage: "url(/backgrounds/Обложка.заметки.jpeg)",
              }}
            >
              <div className="button-name">Заметки</div>
            </NavLink>
          </div>
          <div className="menu-item-wrapper">
            <NavLink
              to="diplomas"
              className="menu-item menu-item-big"
              style={{
                backgroundImage: "url(/backgrounds/Обложка.дипломы.jpeg)",
              }}
            >
              <div className="button-name">Дипломы</div>
            </NavLink>
          </div>
          <div className="menu-item-wrapper">
            <NavLink
              to="contacts"
              className="menu-item menu-item-big"
              style={{
                backgroundImage: "url(/backgrounds/Обложка.контакты.jpeg)",
              }}
            >
              <div className="button-name">Контакты</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
