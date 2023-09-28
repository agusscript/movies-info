import "./Home.scss";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loader from "../../components/Loader/Loader";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { Movie } from "../../types/Movie";
import { get } from "../../utils/httpClient";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = location.search;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate("/?search=/" + search);
  }

  function renderHome() {
    return (
      <>
        <header className="header">
          <Link to={"/"}>
            <h1 className="header-title" onClick={() => setSearch("")}>
              Movies Info
            </h1>
          </Link>
        </header>

        <main>
          <form action="" className="search-form" onSubmit={handleSubmit}>
            <input
              className="search-form-input"
              type="search"
              name="search"
              placeholder="Search your movie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="search-form-btn" type="submit">
              <BiSearch size={27} color="whitesmoke" />
            </button>
          </form>

          {!loading ? (
            <section className="movies-grid-section">
              {movies.map((movie: Movie) => (
                <MovieCard data={movie} key={movie.id} />
              ))}
            </section>
          ) : (
            <Loader />
          )}
        </main>
      </>
    );
  }

  async function fetchMovies() {
    setLoading(true);

    try {
      let response;

      search.length === 0
        ? (response = await get("/discover/movie"))
        : (response = await get("/search/movie?query=" + search));

      const listMovies = response.results;
      setMovies(listMovies);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [urlSearch]);

  return renderHome();
}

export default Home;
