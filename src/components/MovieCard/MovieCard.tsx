import "./MovieCard.scss";

function MovieCard({ title, imageAddress }: { title: string; imageAddress: string }) {
  const urlImage = "https://image.tmdb.org/t/p/w300/";

  return (
    <article className="movie-card">
      <img className="movie-card-poster" src={urlImage + imageAddress} alt={`${title} poster`} />
      <h2 className="movie-card-title">{title}</h2>
    </article>
  );
}

export default MovieCard;
