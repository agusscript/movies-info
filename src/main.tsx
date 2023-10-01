import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import MovieDetails from "./pages/MovieDetails/MovieDetails.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import { PageNumberProvider } from "./context/pageNumber.tsx";

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route
        path="/search/:SearchText"
        element={
          <PageNumberProvider>
            <div className="wrapper">
              <SearchPage />
            </div>
          </PageNumberProvider>
        }
      />
      <Route path="/movies/:MovieId" element={<MovieDetails />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);
