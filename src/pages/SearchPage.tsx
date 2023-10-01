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
  const { pageNumber } = useContext(PageNumberContext);
  const { SearchText } = useParams();

  function renderSearchPage(): JSX.Element {
    return (
      <>
        <Header />

        <main>
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
      let response = await get(`/search/movie?query=${SearchText}&page=${pageNumber}`);

      const listMovies = response.results;
      setMovies(listMovies);
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
