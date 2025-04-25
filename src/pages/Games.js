import React from "react";
import { Link } from "react-router-dom";
import "./../styles/games.css";

function Games() {
  return (
    <div className="games-container">
      <Link to="/wordle" className="game-link">
        <img
          src="https://www.bizzbuzz.news/h-upload/2025/02/15/1954995-new-project-97.webp"
          alt="wordle game"
          width={300}
          height={200}
          className="game-image"
        />
        <div className="game-text">Wordle</div>
      </Link>
    </div>
  );
}

export default Games;
