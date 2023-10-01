import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { PageNumberContext } from "../context/pageNumber";
import { get } from "../utils/httpClient";
import Header from "../components/Header/Header";
import MoviesGrid from "../components/MoviesGrid/MoviesGrid";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";

function SearchPage() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState();
  const { pageNumber } = useContext(PageNumberContext);
  const { SearchText } = useParams();

  function renderSearchPage(): JSX.Element {
    return (
      <>
        <Header />

        <main>
          {movies.length != 0 && !loading && (
            <h3 className="total-results">
              {results} results for <span className="total-results-text">"{SearchText}"</span>
            </h3>
          )}

          {movies.length === 0 && !loading && (
            <h3 className="no-results">No movies found</h3>
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
      let response = await get(`/search/movie?query=${SearchText}&page=${pageNumber}`);

      const listMovies = response.results;
      const totalResults = response.total_results;
      setMovies(listMovies);
      setResults(totalResults);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    document.title = "Movies Info | Search";
    fetchMovies();
  }, [SearchText, pageNumber]);

  return renderSearchPage();
}

export default SearchPage;
