import "./MoviesGrid.scss";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import { get } from "../../utils/httpClient";
import { Movie } from "../../types/Movie";

function MoviesGrid() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const data = await get("/discover/movie");
      setMovies(data.results);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <section className="movies-grid-section">
      <Loader className={`${!loading && "hidden"}`} />
      {movies.map((movie: Movie) => (
        <MovieCard data={movie} key={movie.id} />
      ))}
    </section>
  );
}

export default MoviesGrid;
