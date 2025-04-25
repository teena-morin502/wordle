import React from "react";
import { RouterProvider } from "react-router-dom";
import mainRouter from "./routers/Router";

function App() {
  return (
    <div>
      <RouterProvider router={mainRouter} />
    </div>
  );
}

export default App;
