import React, { useEffect, useState } from "react";

const softColors = [
  "#fce4ec",
  "#f8bbd0",
  "#f48fb1",
  "#f3e5f5",
  "#e1bee7",
  "#ce93d8",
  "#ffebee",
  "#ffcdd2",
  "#ef9a9a",
  "#e1bee7",
  "#d1c4e9",
  "#c5cae9",
  "#fce4ec",
  "#ffe0f0",
  "#e6ccff",
  "#f9d5ec",
  "#e5e0ff",
  "#f0d9ff",
  "#f7d1dc",
  "#fbd4e7",
];

const patternUrls = [
  "url('https://media.istockphoto.com/id/1477417830/vector/game-joystick-on-pink-background-with-stars-vector-seamless-pattern-in-kawaii-style-for.jpg?s=612x612&w=0&k=20&c=XW5vbE4Pq9j4DUmP29gSKtaTgkoZ1ln9mCGRj2Y7gJc=')",
  "url('https://img.freepik.com/premium-vector/safari-cartoon-print_728872-35.jpg?semt=ais_hybrid&w=740')",
  "url('https://img.freepik.com/premium-vector/cute-kid-scribble-line-flower-heart-rainbow-background-hand-drawn-doodle-sketch-childish-element_787654-938.jpg?semt=ais_hybrid&w=740')",
  "url('https://img.freepik.com/free-vector/colorful-doodle-animals-words-pattern_23-2148126637.jpg?semt=ais_hybrid&w=740')",
  "url('https://img.freepik.com/free-vector/hand-drawn-star-pattern-illustration-design_23-2150774391.jpg?ga=GA1.1.1767190933.1746038923&semt=ais_hybrid&w=740')",
  "url('https://img.freepik.com/free-vector/coloured-unicorns-pattern_1131-14.jpg?ga=GA1.1.1767190933.1746038923&semt=ais_hybrid&w=740')",
  "url('https://img.freepik.com/premium-vector/seamless-pattern-featuring-pink-monsters-with-three-eyes-wide-mouths-pink-background_1105822-280.jpg?ga=GA1.1.1767190933.1746038923&semt=ais_hybrid&w=740 ')",
  "url('https://img.freepik.com/free-vector/pattern-with-cute-birds_23-2147513952.jpg?ga=GA1.1.1767190933.1746038923&semt=ais_hybrid&w=740')",
  "url('https://img.freepik.com/premium-vector/vector-seamless-pattern-with-confetti-pink-background_549897-1129.jpg?ga=GA1.1.1767190933.1746038923&semt=ais_hybrid&w=740')",
];

function Settings({ closeSettings }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const savedType = localStorage.getItem("bgType");
    const savedValue = localStorage.getItem("bgValue");

    if (savedType && savedValue) {
      applyBackground(savedType, savedValue, false);
      setSelected(savedValue);
    }
  }, []);

  const applyBackground = (type, value, shouldSave = true) => {
    const root = document.documentElement;
    if (type === "image") {
      root.style.setProperty("--bg-image", value);
      root.style.setProperty("--bg-color", "transparent");
    } else {
      root.style.setProperty("--bg-color", value);
      root.style.setProperty("--bg-image", "none");
    }

    setSelected(value);
    if (shouldSave) {
      localStorage.setItem("bgType", type);
      localStorage.setItem("bgValue", value);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Choose Background Pattern</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {patternUrls.map((url, idx) => (
          <div
            key={idx}
            onClick={() => applyBackground("image", url)}
            style={{
              width: "60px",
              height: "60px",
              backgroundImage: url,
              backgroundSize: "cover",
              border: selected === url ? "3px solid #000" : "1px solid #ccc",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <h2 style={{ marginTop: "2rem" }}>Choose Soft Background Color</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {softColors.map((color, idx) => (
          <div
            key={idx}
            onClick={() => applyBackground("color", color)}
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: color,
              border: selected === color ? "3px solid #000" : "1px solid #ccc",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Settings;
