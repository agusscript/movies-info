import "./MovieCard.scss";
import { Link } from "react-router-dom";
import { Movie } from "../../types/Movie";
import getImage from "../../utils/getImage";

function MovieCard({ data }: { data: Movie }) {
  const urlImage = data.poster_path
    ? getImage(500, data.poster_path)
    : "https://raw.githubusercontent.com/agusscript/movies-info/main/assets/no-image-placeholder.jpg";

  return (
    <article className="movie-card">
      <Link to={"/movies/" + data.id}>
        <img className="movie-card-poster" src={urlImage} alt={`${data.title} poster`} />
      </Link>
      <h2 className="movie-card-title">{data.title}</h2>
    </article>
  );
}

export default MovieCard;
