import styles from "./RecentSearch.module.css";
import { GoSearch } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";

function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const removeSearch = (title) => {
    const updatedSearches = recentSearches.filter((item) => item !== title);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div className={styles.recentContainer}>
      <div className={styles.header}>Recent Searches</div>
      <ul>
        {recentSearches.length > 0 ? (
          recentSearches.map((search, index) => (
            <li key={index} className={styles.li}>
              <span className={styles.searchIcon}>
                <GoSearch />
              </span>
              {search}
              <button
              type="button"
                className={styles.closeBtn}
                onClick={() => removeSearch(search)}
              >
                <IoCloseSharp />
              </button>
            </li>
          ))
        ) : (
          <p>No recent searches</p>
        )}
      </ul>
    </div>
  );
}

export default RecentSearches;
