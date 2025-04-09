import React from 'react';
import './../css_pages/wordle.css';

const WordleGrid = ({ attempts, currentGuess, gameState }) => {
  const rows = [...attempts];

  if (gameState === 'playing' && rows.length < 6) {
    const paddedGuess = currentGuess.padEnd(5, '');
    rows.push({
      word: currentGuess,
      result: paddedGuess.split('').map((letter) => ({ letter, status: '' }))
    });
  }

  while (rows.length < 6) {
    rows.push({
      word: '',
      result: Array(5).fill({ letter: '', status: '' })
    });
  }

  return (
    <div className="wordle-grid">
      {rows.map((row, rowIndex) => (
        <div className="wordle-row" key={rowIndex}>
          {row.result.map((cell, colIndex) => (
            <div key={colIndex} className={`wordle-box ${cell.status}`}>
              {cell.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WordleGrid;
