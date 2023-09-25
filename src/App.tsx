import "./main.scss";
import MovieCard from "./components/MovieCard/MovieCard";
import Footer from "./components/Footer/Footer";
import { get } from "./utils/httpClient";
import { useState, useEffect } from "react";
import { Movie } from "./types/Movie";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get("/discover/movie");
      // console.log(data);
      setMovies(data.results);
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">

      <header>
        <h1>Movies Info</h1>
      </header>

      <main>
        <div className="movies-container">
          {movies.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              imageAddress={movie.poster_path}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
