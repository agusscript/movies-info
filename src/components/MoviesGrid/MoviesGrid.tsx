import "./MoviesGrid.scss";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import { get } from "../../utils/httpClient";
import { Movie } from "../../types/Movie";

function MoviesGrid() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  function showGrid() {
    return (
      <section className="movies-grid-section">
        {movies.map((movie: Movie) => (
          <MovieCard data={movie} key={movie.id} />
        ))}
      </section>
    );
  }

  async function fetchMovies() {
    try {
      const response = await get("/discover/movie");
      const listMovies = response.results;
      setMovies(listMovies);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  if (!loading) {
    return showGrid();
  } else {
    return <Loader />;
  }
}

export default MoviesGrid;
