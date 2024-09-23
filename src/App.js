import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar";
import ScrollToTop from "./Components/ScrollToTop";
import Home from "./Components/Home/Home";
import Details from "./Components/Details/Details";
import SearchPage from "./Components/SearchPage/SearchPage";
import { Routes, Route } from "react-router-dom";
import About from "./Components/About/About";
import Loader from "./Components/Loader/Loader";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";

function App() {
  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavBar movieName={movieName} setMovieName={setMovieName} />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search"
              element={<SearchPage movieName={movieName} />}
            />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/about" element={<About />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
