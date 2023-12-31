import "./MovieDetails.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../types/Movie";
import { get } from "../../utils/httpClient";
import { AiFillStar } from "react-icons/ai";
import getImage from "../../utils/getImage";
import Loader from "../../components/Loader/Loader";

function MovieDetails() {
  const { MovieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState({} as Movie);

  const urlImage = movieDetails.poster_path
    ? getImage(500, movieDetails.poster_path)
    : "https://raw.githubusercontent.com/agusscript/movies-info/main/assets/no-image-placeholder.jpg";

  function renderDetails() {
    return (
      <div className="wrapper">
        <section className="movie-details-section">
          <div className="movie-poster-container">
            <img
              className="movie-poster-container-img"
              src={urlImage}
              alt={movieDetails.title}
            />
          </div>

          <div className="movie-details-container">
            <h1 className="movie-details-container-title">{movieDetails.title}</h1>

            <p className="movie-details-container-tagline">
              {movieDetails.tagline.length > 1 && `"${movieDetails.tagline}"`}
            </p>

            <p className="movie-details-container-overview">{movieDetails.overview}</p>

            <div className="rating-container">
              <span className="rating-container-value">
                <AiFillStar color="#F5B700" size={23}/>
                {movieDetails.vote_average.toFixed(1)}
              </span>
              <p className="rating-container-votes">{movieDetails.vote_count} votes</p>
            </div>

            <div className="date-container">
              <span className="date-container-release-date">
                {movieDetails.release_date}
              </span>
            </div>

            <div className="genres-container">
              {movieDetails.genres.map((genre) => (
                <span className="genres-container-genre" key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  async function fetchMovieDetails() {
    try {
      const response = await get("/movie/" + MovieId);
      setMovieDetails(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.title = "Movies Info | Details";
    fetchMovieDetails();
  }, []);

  if (!loading) {
    return renderDetails();
  } else {
    return <Loader />;
  }
}

export default MovieDetails;
