import { createBrowserRouter } from "react-router-dom";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import WordleGame from "./../pages/WordleGame";
import Layout from "../pages/Layout";
import Games from "../pages/Games";

const mainRouter = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path:"/games",
        element:<Games/>
      },
      {
        path: "/wordle",
        element: <WordleGame />,
      },

      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default mainRouter;
