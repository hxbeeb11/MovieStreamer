import React from "react";
import { Rating } from "react-simple-star-rating";
import styles from "./StarRating.module.css";

function StarRating({ rating }) {
  const validRating = typeof rating === "number" && rating >= 0 && rating <= 10 ? rating : 0;

  const starsOutOfFive = validRating / 2;

  return (
    <div className={styles.starRating}>
      <Rating
        readonly
        allowFraction
        initialValue={starsOutOfFive}
        size={30}
        fillColor="rgba(229, 0, 0, 1)"
        emptyColor="rgba(153, 153, 153, 1)" 
      />
      <h3 className={styles.ratingNumber}>{starsOutOfFive.toFixed(1)}</h3>
    </div>
  );
}

export default StarRating;
