import { NavLink } from "react-router-dom";
import "./Loading.css";

function Loading({ text, color, animDur }) {
  let loadingText = [];
  for (let i = 0; i < text.length; i++) {
    loadingText.push(
      <div
        style={{
          animation: `loading-anim 5s ease-in-out`,
          animationDelay: `${i * 80}ms`,
          animationIterationCount: `${animDur ? animDur : 1}`,
        }}
        className="loading-letter"
        key={i}
      >
        {text[i]}
      </div>
    );
  }
  return (
    <NavLink className="loading" to="/" style={{ color: `${color}` }}>
      {loadingText}
    </NavLink>
  );
}

export default Loading;
