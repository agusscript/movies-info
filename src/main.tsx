import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import MovieDetails from "./pages/MovieDetails/MovieDetails.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/movies/:MovieId" element={<MovieDetails />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
