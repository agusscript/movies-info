import "./MovieDetails.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../types/Movie";
import { get } from "../../utils/httpClient";
import getImage from "../../utils/getImage";
import Loader from "../../components/Loader/Loader";
import starImg from "../../../assets/star-icon.svg";

function MovieDetails() {
  const { MovieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movieDetails, setMovieDetails] = useState({} as Movie);
  const urlImage = getImage(500, movieDetails.poster_path);

  function showDetails() {
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
                <img
                  className="rating-container-value-img"
                  src={starImg}
                  alt="star icon"
                />
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  if (!loading) {
    return showDetails();
  } else {
    return <Loader />;
  }
}

export default MovieDetails;
