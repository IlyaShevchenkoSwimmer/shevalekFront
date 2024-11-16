import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "../small-components/Loading";
import "./Notes.css";
import "../small-components/Path.css";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("https://shevalek.space:8443/api/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        console.log(data);
      });
  }, []);

  const notesArr = notes.map((note, index) => {
    return (
      <article className="notes-item" key={index}>
        <h2>{note.heading}</h2>
        <p>
          {note.text.split("\n").map((text, index) => (
            <span key={index}>
              {text}
              <br />
            </span>
          ))}
        </p>
      </article>
    );
  });

  return notes.length === 0 ? (
    <Loading text="Shevalek.Space" animDur="infinite" />
  ) : (
    <div className="notes-wrapper">
      <Loading text="Shevalek.Space" />
      <nav className="notes-menu">
        <div className="path notes-path">
          <NavLink className="go-back" to={`/`} path="relative">
            {"<"}
          </NavLink>
          <NavLink className="path-button" to="/">
            Shevalek.Space
          </NavLink>
          <NavLink className="path-button" to={`/notes`}>
            /Заметки
          </NavLink>
        </div>
        <a
          href="https://litres.ru/69551509"
          target="_blank"
          className="notes-folder-a"
        >
          От Луны до Луны
        </a>
      </nav>
      <div className="notes-gallery">{notesArr}</div>
    </div>
  );
}

export default Notes;
