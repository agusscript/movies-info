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
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = location.search;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setPageNumber(1);
    navigate("/?search=/" + search);
  }

  function handleBackHomeClick(): void {
    setSearch("");
    navigate("/");
    setPageNumber(1);
  }

  function renderHome(): JSX.Element {
    return (
      <>
        <header className="header">
          <Link to={"/"}>
            <h1 className="header-title" onClick={handleBackHomeClick}>
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

          {movies.length === 0 && !loading && (
            <p className="no-results">No movies found</p>
          )}

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

          <section className="navigation">
            <button
              className="navigation-prev"
              onClick={() => pageNumber != 1 && setPageNumber(pageNumber - 1)}
            >
              Prev
            </button>
            <div className="navigation-number-page">
              <span className="navigation-number-text">{pageNumber}</span>
            </div>
            <button
              className="navigation-next"
              onClick={() =>
                movies.length != 0 && !loading && setPageNumber(pageNumber + 1)
              }
            >
              Next
            </button>
          </section>
        </main>
      </>
    );
  }

  async function fetchMovies(): Promise<void> {
    setLoading(true);

    try {
      let response;

      if (search.length === 0) {
        response = await get("/discover/movie?&page=" + pageNumber);
      } else {
        response = await get(`/search/movie?query=${search}&page=${pageNumber}`);
      }

      const listMovies = response.results;
      setMovies(listMovies);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.title = "Movies Info | Home";
    fetchMovies();
  }, [urlSearch, pageNumber]);

  return renderHome();
}

export default Home;
