import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404</h1>
      <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className={styles.homeLink}>Go Back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
