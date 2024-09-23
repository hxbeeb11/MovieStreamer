import styles from "./Details.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";

function Details() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            accept: "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }

        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${details.backdrop_path}`;

  return (
    <>
      <div className={`${styles.container} container rounded-5 mt-3`}>
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${backdropUrl})` }}
        ></div>
        <div className={styles.homecontent}>
          <h1>{details.title}</h1>
          <br />
          <p>{details.overview}</p>
          <br />
          <button className={styles.playbutton}>Play Now</button>
        </div>
      </div>
      <br />
      <div className={`${styles.details}`}>
        <MovieAttributes details={details} />
      </div>
    </>
  );
}

const MovieAttributes = ({ details }) => (
  <div className={styles.attributes}>
    <Attribute title="Release Date" icon="/images/calender.png" content={details.release_date} />
    <Attribute title="Available Languages" icon="/images/language.png">
      <div className={styles.buttonContainer}>
        {details.spoken_languages?.map((language) => (
          <button key={language.iso_639_1} className={styles.button}>
            {language.english_name}
          </button>
        ))}
      </div>
    </Attribute>
    <Attribute title="Ratings" icon="/images/rating.png">
      <div className={styles.ratingboxes}>
        <div className={styles.imdbrating}>
          <p>IMDb</p>
          <StarRating rating={details.vote_average} />
        </div>
        <div className={styles.imdbrating}>
          <p>Streamvibe</p>
          <StarRating rating={details.vote_average} />
        </div>
      </div>
    </Attribute>
    <Attribute title="Genres" icon="/images/Genre.png">
      <div className={styles.buttonContainer}>
        {details.genres?.map((genre) => (
          <button key={genre.id} className={styles.button}>
            {genre.name}
          </button>
        ))}
      </div>
    </Attribute>
  </div>
);

const Attribute = ({ title, icon, content, children }) => (
  <div className={styles.attribute}>
    <p style={{ color: "rgba(153,153,153,1)" }}>
      {icon && <img src={icon} alt={`${title}-icon`} />}
      {title}:
    </p>
    <p style={{ color: "rgba(91,91,91,1)" }}>{content}</p>
    {children}
  </div>
);

export default Details;
