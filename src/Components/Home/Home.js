import styles from "./Home.module.css";
import Card from "../Card/Card";
import { useState, useEffect, useCallback } from "react";

function MovieSection({ genre, movies, isLoading }) {
  return (
    <div className={`${styles.moviecontainer} mt-5`}>
      <div style={{ float: "right", width: "93%" }}>
        <hr />
      </div>
      <p className="lead ms-3" style={{ fontSize: "20px", fontWeight: "400" }}>
        {genre}
      </p>
      <div className={`${styles.movies} ms-3`}>
        {isLoading ? (
          <p>Loading {genre.toLowerCase()} movies...</p>
        ) : (
          movies.map((movie) => <Card key={movie.id} data={movie} />)
        )}
      </div>
    </div>
  );
}

function Home() {
  const [moviesByGenre, setMoviesByGenre] = useState({
    thrillers: [],
    comedies: [],
    dramas: [],
  });
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const apiUrl = "https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&include_adult=false";

  const fetchMovies = useCallback(async (genreId) => {
    try {
      const response = await fetch(`${apiUrl}&with_genres=${genreId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          accept: "application/json",
        },
      });
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  }, [API_KEY, apiUrl]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      setLoading(true);
      try {
        const [thrillersData, comediesData, dramasData] = await Promise.all([
          fetchMovies(53),
          fetchMovies(35),
          fetchMovies(18),
        ]);

        setMoviesByGenre({
          thrillers: thrillersData,
          comedies: comediesData,
          dramas: dramasData,
        });
      } catch (error) {
        console.error("Error fetching all movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, [fetchMovies]);

  return (
    <>
      <div className={`${styles.container} container rounded-5 mt-3`}>
        <div className={styles.background}></div>
        <div className={styles.homecontent}>
          <h1 style={{ fontWeight: "600", fontSize: "60px" }}>MovieStreamer</h1>
          <h3
            style={{ fontWeight: "500", fontSize: "40px", color: "rgba(86,86,86,1)" }}
          >
            Enjoy Watching
          </h3>
          <br />
          <p style={{ fontWeight: "500", fontSize: "20px" }}>
            I developed a movie browser web app using React that allows users to explore
            a wide range of movies, including trending and top-rated titles. The app
            connects to the TMDB API to fetch real-time movie data, providing users with
            up-to-date information about various films.
          </p>
          <p style={{ fontWeight: "500", fontSize: "20px" }}>
            To enhance the visual appeal of the app, I incorporated animations and
            responsive design principles. The layout adjusts to different screen sizes,
            making the app accessible on both desktop and mobile devices. The use of a
            clean and modern design, combined with real-time data fetching, creates an
            enjoyable browsing experience for users, allowing them to search for and
            explore movies effortlessly.
          </p>
        </div>
      </div>

      <br />
      <MovieSection genre="Thriller" movies={moviesByGenre.thrillers} isLoading={loading} />
      <MovieSection genre="Comedy" movies={moviesByGenre.comedies} isLoading={loading} />
      <MovieSection genre="Drama" movies={moviesByGenre.dramas} isLoading={loading} />
    </>
  );
}

export default Home;
