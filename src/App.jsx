import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import shevalekLogo from "/shevalek.jpg";

import "./App.css";

import Home from "./components/route-components/Home";
import Photos from "./components/route-components/Photos";
import Calendar from "./components/route-components/Photos/Calendar";
import Categories from "./components/route-components/Photos/Categories";
import Year from "./components/route-components/Photos/Year";
import Category from "./components/route-components/Photos/Category";

import Video from "./components/route-components/Video";
import Music from "./components/route-components/Music";
import Notes from "./components/route-components/Notes";
import Diplomas from "./components/route-components/Diplomas";
import Contacts from "./components/route-components/Contacts";

function App() {
  useEffect(() => {
    fetch("https://shevalek.space:8443/api/photos/refresh");
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route element={<Home />} index></Route>
            <Route element={<Photos />} path="photos">
              <Route element={<Calendar />} path="calendar" />
              <Route element={<Year />} path="calendar/:year" />
              <Route element={<Categories />} path="categories" />
              <Route element={<Category />} path="categories/:category" />
            </Route>
            <Route element={<Video />} path="video"></Route>
            <Route element={<Music />} path="music"></Route>
            <Route element={<Notes />} path="notes"></Route>
            <Route element={<Diplomas />} path="diplomas"></Route>
            <Route element={<Contacts />} path="contacts"></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
