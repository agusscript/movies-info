import { Link } from "react-router-dom";
import { Movie } from "../../types/Movie";
import "./MovieCard.scss";

function MovieCard({ data }: { data: Movie }) {
  const urlImage = "https://image.tmdb.org/t/p/w500/";

  return (
    <article className="movie-card">
      <Link to={"/movies/" + data.id}>
        <img
          className="movie-card-poster"
          src={urlImage + data.poster_path}
          alt={`${data.title} poster`}
        />
      </Link>
      <h2 className="movie-card-title">{data.title}</h2>
    </article>
  );
}

export default MovieCard;
