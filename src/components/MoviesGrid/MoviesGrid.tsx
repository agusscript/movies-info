import "./MoviesGrid.scss";
import { Movie } from "../../types/Movie";
import MovieCard from "../MovieCard/MovieCard";
import Loader from "../Loader/Loader";

function MoviesGrid({ loading, movies }: { loading: boolean; movies: Movie[] }) {
  return (
    <section className="movies-grid-section">
      {!loading ? (
        <>
          {movies.map((movie: Movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

export default MoviesGrid;
