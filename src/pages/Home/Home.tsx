import "./Home.scss";
import { useState, useEffect, useContext } from "react";
import { PageNumberContext } from "../../context/pageNumber";
import { SearchContext } from "../../context/search";
import { useLocation } from "react-router-dom";
import { get } from "../../utils/httpClient";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesGrid from "../../components/MoviesGrid/MoviesGrid";
import Footer from "../../components/Footer/Footer";
import Navigation from "../../components/Navigation/Navigation";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const { pageNumber } = useContext(PageNumberContext);
  const { search } = useContext(SearchContext);

  const location = useLocation();
  const urlSearch = location.search;

  function renderHome(): JSX.Element {
    return (
      <>
        <Header />

        <main>
          <SearchForm />

          {movies.length === 0 && !loading && (
            <p className="no-results">No movies found</p>
          )}

          <MoviesGrid loading={loading} movies={movies} />

          <Navigation movies={movies} loading={loading} />
        </main>

        <Footer />
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
