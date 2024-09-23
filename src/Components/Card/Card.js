import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function Card({ data }) {
  const detailUrl = `/details/${data.id}`;
  const posterPath = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage("recentSearches", []);

  const saveRecentSearch = (title) => {
    const updatedSearches = [title, ...recentSearches].slice(0, 4);
    setRecentSearches(updatedSearches);
  };

  return (
    <div className={`${styles.moviecard} card rounded-4`} style={{ width: "243px", height: "422px", border: "none" }}>
      <div className={styles.imageContainer} style={{ position: 'relative', height: '100%' }}>
        
        {loading && !imageError && (
          <div className={styles.loader}>Loading Image...</div>
        )}

        {!imageError && (
          <img
            src={posterPath}
            className="card-img-top rounded-4"
            alt={data.title}
            onLoad={() => setLoading(false)}
            onError={() => {
              setImageError(true);
              setLoading(false);
            }}
            style={{ display: loading ? "none" : "block" }}
          />
        )}

        {imageError && (
          <div className={styles.errorContainer}>
            <p>{data.title}</p>
          </div>
        )}

        <div className={styles.overview}>
          <p className="lead">{data.overview}</p>
        </div>
      </div>
      
      <div className="card-body">
        <center>
          <Link
            to={detailUrl}
            className="btn btn-primary rounded-pill"
            style={{
              fontWeight: "400",
              width: "100%",
              backgroundColor: "#565656",
            }}
            onClick={() => saveRecentSearch(data.title)}
          >
            {data.title}
          </Link>
        </center>
      </div>
    </div>
  );
}

export default Card;
