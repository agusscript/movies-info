import "./main.scss";
import { PageNumberProvider } from "./context/pageNumber";
import { SearchProvider } from "./context/search";
import Home from "./pages/Home/Home";

function App() {
  return (
    <PageNumberProvider>
      <SearchProvider>
        <div className="wrapper">
          <Home />
        </div>
      </SearchProvider>
    </PageNumberProvider>
  );
}

export default App;
