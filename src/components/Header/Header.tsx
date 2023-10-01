import "./Header.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PageNumberContext } from "../../context/pageNumber";

function Header() {
  const {setPageNumber} = useContext(PageNumberContext);

  function handleBackHomeClick(): void {
    setPageNumber(1);
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
