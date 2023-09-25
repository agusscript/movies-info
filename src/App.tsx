import "./main.scss";
import MovieCard from "./components/MovieCard/MovieCard";
import Footer from "./components/Footer/Footer";
import { get } from "./utils/httpClient";
import { useState, useEffect } from "react";
import { Movie } from "./types/Movie";
import Loader from "./components/Loader/Loader";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const data = await get("/discover/movie");
      setMovies(data.results);
      // console.log(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <header>
        <h1>Movies Info</h1>
      </header>

      <main>
        <Loader className={`${!loading && "hidden"}`} />
        <div className="movies-container">
          {movies.map((movie: Movie) => (
            <MovieCard data={movie} key={movie.id} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
