import React, { useState, useEffect } from "react";
import GameProvider from "./GameProvider";
import WordleGrid from "./WordleGrid";
import WordleKeyboard from "./WordleKeyboard ";
import "./../styles/wordle.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaTrophy, FaArrowLeft } from "react-icons/fa";

function WordleGame() {
  const {
    currentGuess,
    attempts,
    keyColors,
    gameState,
    secretWord,
    handleKeyPress,
  } = GameProvider();

  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  // 🕒 Timer logic
  useEffect(() => {
    let interval;
    if (gameState === "playing") {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    } else if (gameState !== "playing") {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // 🧠 Handle win/lose alerts
  useEffect(() => {
    if (gameState === "won") {
      Swal.fire({
        title: "🎉 Congrats!",
        text: `You guessed the word "${secretWord.toUpperCase()}" in ${timer} seconds.`,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Replay",
        cancelButtonText: "Back to Home",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          navigate("/games");
        }
      });
    } else if (gameState === "lost") {
      Swal.fire({
        title: "😢 You lost!",
        text: `The word was "${secretWord.toUpperCase()}"`,
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "Replay",
        cancelButtonText: "Back to Home",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          navigate("/games");
        }
      });
    }
  }, [gameState]);

  return (
    <div className="wordle-container">
      {/* 🔝 Top Bar */}
      <div className="top-bar">
        <Link to="/games" className="top-bar-icon">
          <FaArrowLeft title="Back to Games" />
        </Link>
        <h2 className="top-bar-title">Wordle</h2>
        <Link to="/leaderboard" className="top-bar-icon">
          <FaTrophy title="Leaderboard" />
        </Link>
        <div className="top-bar-timer">
          ⏱️ {timer}s
        </div>
      </div>

      {/* 🔠 Game Board */}
      <WordleGrid
        attempts={attempts}
        currentGuess={currentGuess}
        gameState={gameState}
      />
      <WordleKeyboard keyColors={keyColors} onKeyPress={handleKeyPress} />
    </div>
  );
}

export default WordleGame;
