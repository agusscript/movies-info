import "./MovieDetails.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../types/Movie";
import { get } from "../../utils/httpClient";
import getImage from "../../utils/getImage";
import Loader from "../../components/Loader/Loader";

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
            <p className="movie-details-container-overview">{movieDetails.overview}</p>
            <p className="movie-details-container-release-date">
              Release Date: {movieDetails.release_date}
            </p>
            <p className="movie-details-container-vote-average">
              Rating {movieDetails.vote_average.toFixed(1)}
            </p>
            <div>
              Genres
              <p>
                {movieDetails.genres.map((genre) => (
                  <span className="movie-details-container-genre" key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </p>
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
    fetchMovieDetails();
  }, []);

  if (!loading) {
    return showDetails();
  } else {
    return <Loader />;
  }
}

export default MovieDetails;
