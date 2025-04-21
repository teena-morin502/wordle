import React, { useState } from "react";
import { Outlet, RouterProvider } from "react-router-dom";
import mainRouter from "./routers/Router";
import WordleGame from "./pages/WordleGame";
import Layout from "./pages/Layout";

function App() {
  return (
    <div>
      <RouterProvider router={mainRouter} />
    </div>
  );
}

export default App;
