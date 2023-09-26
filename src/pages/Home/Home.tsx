import MoviesGrid from "../../components/MoviesGrid/MoviesGrid";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <div className="wrapper">
      <header>
        <h1>Movies Info</h1>
      </header>

      <main>
        <MoviesGrid />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
