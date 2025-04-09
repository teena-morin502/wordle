import React from 'react';
import GameProvider from './GameProvider';
import WordleGrid from './WordleGrid';
import WordleKeyboard from './WordleKeyboard ';
import './../css_pages/wordle.css';

function WordleGame(){
  const {
    currentGuess,
    attempts,
    keyColors,
    gameState,
    secretWord,
    handleKeyPress,
  } = GameProvider();

  return (
    <div className="wordle-container">
      <h2>Wordle Game</h2>

      <WordleGrid
        attempts={attempts}
        currentGuess={currentGuess}
        gameState={gameState}
      />

      <WordleKeyboard keyColors={keyColors} onKeyPress={handleKeyPress} />



      {gameState !== 'playing' && (
        <h3>
          {gameState === 'won' ? '🎉 You won!' : '😢 You lost! The word was ' + secretWord}
        </h3>
      )}
    </div>
  );
};

export default WordleGame;
