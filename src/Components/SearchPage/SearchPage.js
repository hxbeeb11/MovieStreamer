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

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(({ results }) => {
        setMovieData(results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch movies.");
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
        <p>{error}</p>
      ) : (
        <>
          <Hero movieName={movieName} />
          <br />
          <div className={styles.movieCardContainer}>
            {movieData.length > 0 ? (
              movieData.map((movie) => <Card key={movie.id} data={movie} />)
            ) : (
              <div className={styles.loaderContainer}>
                <p>No movies found for "{movieName}".</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default SearchPage;
