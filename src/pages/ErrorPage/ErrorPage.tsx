import "./ErrorPage.scss";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section className="error-page">
      <h1 className="error-page-title">Oops!</h1>
      <p className="error-page-text">404 not found</p>
      <Link to={"/"}>
        <button className="error-page-button">Back to Home</button>
      </Link>
    </section>
  );
}

export default ErrorPage;
