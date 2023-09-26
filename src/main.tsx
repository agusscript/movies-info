import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Root from "./pages/MovieDetails/MovieDetails.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/movies/:MovieId",
    element: <Root />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
