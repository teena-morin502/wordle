import React from "react";

const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

const WordleKeyboard = ({ keyColors, onKeyPress }) => {
  return (
    <div className="wordle-keyboard">
      {rows.map((row, i) => (
        <div key={i} className="keyboard-row">
          {i === 2 && (
            <button className="key-button" onClick={() => onKeyPress("ENTER")}>
              ENTER
            </button>
          )}
          {row.split("").map((key) => (
            <button
              key={key}
              className="key-button"
              style={{
                backgroundColor: keyColors[key.toLowerCase()] || "white",
              }}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>
          ))}
          {i === 2 && (
            <button
              className="key-button"
              onClick={() => onKeyPress("BACKSPACE")}
            >
              ⌫
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default WordleKeyboard;
