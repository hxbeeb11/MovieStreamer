import styles from "./SearchPage.module.css";
import Hero from "../Hero/Hero";
import { useEffect, useState } from "react";
import Card from "../Card/Card";

function SearchPage({ movieName }) {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieName) return;

    setLoading(true);
    setError(null);

    const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`;
    console.log('Searching:', searchUrl);

    fetch(searchUrl, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Search response:', data);
        if (data.results && data.results.length > 0) {
          setMovieData(data.results);
        } else {
          setMovieData([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Search error:", err);
        setError("Failed to fetch movies. Please try again.");
        setLoading(false);
      });
  }, [movieName]);

  return (
    <>
      {loading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <>
          <Hero movieName={movieName} />
          <br />
          <div className={styles.movieCardContainer}>
            {movieData.length > 0 ? (
              movieData.map((movie) => <Card key={movie.id} data={movie} />)
            ) : (
              <div className={styles.loaderContainer}>
                <p>No movies found for "{movieName}". Try checking the spelling or use different keywords.</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default SearchPage;
