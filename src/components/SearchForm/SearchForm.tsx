import "./SearchForm.scss";
import { BiSearch } from "react-icons/bi";
import { SearchContext } from "../../context/search";
import { PageNumberContext } from "../../context/pageNumber";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const { search, setSearch } = useContext(SearchContext);
  const { setPageNumber } = useContext(PageNumberContext);
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setPageNumber(1);
    navigate("/search/" + search);
  }

  return (
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
  );
}

export default SearchForm;
