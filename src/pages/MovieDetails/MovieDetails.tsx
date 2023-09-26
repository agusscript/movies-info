import "./MovieDetails.scss";
import Footer from "../../components/Footer/Footer";
import { get } from "../../utils/httpClient";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Movie } from "../../types/Movie";
import getImage from "../../utils/getImage";

function MovieDetails() {
  const { MovieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({} as Movie);
  const urlImage = getImage(500, movieDetails.poster_path);

  useEffect(() => {
    const fetchData = async () => {
      const data = await get("/movie/" + MovieId);
      setMovieDetails(data);
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <section className="movie-details-section">
        <h2>{movieDetails.title}</h2>
        <p>{movieDetails.overview}</p>
        <img src={urlImage} alt={movieDetails.title} />
      </section>
      <Footer />
    </div>
  );
}

export default MovieDetails;
