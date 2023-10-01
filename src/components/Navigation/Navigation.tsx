import "./Navigation.scss";
import { useContext } from "react";
import { PageNumberContext } from "../../context/pageNumber";
import { Movie } from "../../types/Movie";

function Navigation({ movies, loading }: { movies: Movie[]; loading: boolean }) {
  const { pageNumber, setPageNumber } = useContext(PageNumberContext);

  return (
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
        onClick={() => movies.length != 0 && !loading && setPageNumber(pageNumber + 1)}
      >
        Next
      </button>
    </section>
  );
}

export default Navigation;
