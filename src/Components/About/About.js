import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.container}>
      <h1>About My Project</h1>
      <br />

      <section className={styles.section}>
        <h2>Project Overview</h2>
        <p>
          Welcome to my Movie Browsing Application! This platform is designed to
          offer an engaging and seamless experience for both movie enthusiasts.
          Built using React.js, Bootstrap, and the TMDb API, it provides rich
          functionality, such as search capabilities, detailed information
          pages, and responsive design.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Main Components and Features</h2>
        <ul>
          <li>
            <strong>NavBar Component:</strong>
            <p>
              This component includes a search bar that allows users to search
              for movies. It also has a Recent Searches dropdown that appears
              when focusing on the search bar, displaying up to four previous
              searches. The Recent Searches dropdown can be interacted with, and
              searches are stored using localStorage for persistence across
              sessions.
            </p>
          </li>
          <li>
            <strong>SearchPage Component:</strong>
            <p>
              When users enter a query in the search bar, they are navigated to
              the SearchPage, which fetches movie data from the TMDb API and
              displays the results using responsive card layout. Users can view
              basic information about each result, such as the title and release
              date.
            </p>
          </li>
          <li>
            <strong>Details Component:</strong>
            <p>
              Upon clicking on a movie, users are navigated to the Details page.
              This component fetches detailed information from the TMDb API,
              including the title, description, release date, genres, available
              languages, and ratings. A custom StarRating component displays the
              average rating using stars.
            </p>
          </li>
          <li>
            <strong>StarRating Component:</strong>
            <p>
              This component visually represents the movie rating using stars,
              rounded to the nearest half-star. It provides users with an
              intuitive understanding of the rating and is dynamically updated
              based on API data.
            </p>
          </li>
          <li>
            <strong>RecentSearches Component:</strong>
            <p>
              RecentSearches helps users quickly access previously searched
              queries. It is integrated into the NavBar and displays the most
              recent searches stored via localStorage. This component enhances
              user experience by enabling efficient navigation without
              re-entering search terms.
            </p>
          </li>
          <li>
            <strong>Register Component:</strong>
            <p>
              This component features a registration form that includes fields
              for username, email, phone number, password, and password
              confirmation. It handles user input through state management and
              validates form submission.
            </p>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Technologies Used</h2>
        <p>
          My application uses several modern technologies to deliver a robust
          and interactive experience:
        </p>
        <ul>
          <li>
            <strong>React.js:</strong> The foundation of the application,
            providing a dynamic and efficient UI through reusable components.
          </li>
          <li>
            <strong>Bootstrap (via CDN):</strong> Ensures a responsive and
            visually appealing design, applied through ready-made classes and
            components.
          </li>
          <li>
            <strong>TMDb API:</strong> Provides access to a vast collection of
            movie data, enabling search functionality and detailed information
            displays.
          </li>
          <li>
            <strong>Local Storage:</strong> Stores recent searches and user
            preferences locally in the browser for a personalized experience
            across sessions.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Contact Us</h2>
        <p>
          For any questions, feedback, or suggestions, feel free to contact me
          at:
        </p>
        <p>Email: habeebsuperman@gmail.com</p>
      </section>
    </div>
  );
};

export default About;
