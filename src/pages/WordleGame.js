import React, { useState, useEffect } from "react";
import useGameProvider from "./GameProvider";
import WordleGrid from "./WordleGrid";
import WordleKeyboard from "./WordleKeyboard ";
import { FaStopwatch } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import "./../styles/wordle.css";

function WordleGame() {
  const { currentGuess, attempts, keyColors, gameState, handleKeyPress } = useGameProvider();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (gameState === "playing") {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const format = (val) => (val < 10 ? "0" + val : val);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const display = `${format(minutes)}:${format(seconds)}`;

  return (
    <div className="wordle-container">
      <Toaster position="top-center" />

      <div className="top-bar">
        <div className="top-bar-timer">
          <FaStopwatch />
          <span>{display}</span>
        </div>
      </div>

      <div className="game-area">
        <WordleGrid
          attempts={attempts}
          currentGuess={currentGuess}
          gameState={gameState}
        />
        <WordleKeyboard keyColors={keyColors} onKeyPress={handleKeyPress} />
      </div>
    </div>
  );
}

export default WordleGame;
