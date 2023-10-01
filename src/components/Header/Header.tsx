import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/search";
import { useContext } from "react";
import { PageNumberContext } from "../../context/pageNumber";

function Header() {
  const {setSearch} = useContext(SearchContext);
  const {setPageNumber} = useContext(PageNumberContext);
  const navigate = useNavigate();

  function handleBackHomeClick(): void {
    setPageNumber(1);
    setSearch("");
    navigate("/");
  }

  return (
    <header className="header">
      <Link to={"/"}>
        <h1 className="header-title" onClick={handleBackHomeClick}>
          Movies Info
        </h1>
      </Link>
    </header>
  );
}

export default Header;
