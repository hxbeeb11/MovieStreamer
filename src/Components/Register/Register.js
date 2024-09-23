import { useState } from "react";
import styles from "./Register.module.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    setErrorMessage(""); 

    console.log("Form Data:");
    console.log(`Username: ${formData.username}`);
    console.log(`Email: ${formData.email}`);
    console.log(`Phone Number: ${formData.number}`);
    console.log(`Password: ${formData.password}`);
    console.log(`Confirm Password: ${formData.confirmPassword}`);
  };

  return (
    <div className={styles.registercontainer}>
      <h2>Sign in to MovieStreamer</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className={`${styles.input}`}
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className={`${styles.input}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="number">Phone Number</label>
          <input
            type="tel"
            className={`${styles.input}`}
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className={`${styles.input}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className={`${styles.input}`}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Register;
