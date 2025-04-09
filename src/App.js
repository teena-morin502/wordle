// src/App.js

import React from "react";
import { GameProvider } from "./components/pages/js_pages/GameProvider";  // Import GameProvider
import WordleGame from "./components/pages/js_pages/WordleGame";  // Import WordleGame

function App() {
  return (

      <WordleGame />

  );
}

export default App;
