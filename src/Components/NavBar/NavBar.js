import { GoSearch } from "react-icons/go";
import Modal from "react-modal";
import Register from "../Register/Register";
import RecentSearches from "../RecentSearch/RecentSearch";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    borderRadius: "20px",
    width: "650px",
    height: "700px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
  },
};

function NavBar({ movieName, setMovieName }) {
  const navigate = useNavigate();
  const [modalVisible, setModalVisible] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

  const recentSearchesRef = useRef(null);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setMovieName(value);
    if (value.trim()) {
      navigate("/search");
    }
  };

  useEffect(() => {
    document.body.classList.toggle("no-scroll", modalVisible);
    return () => document.body.classList.remove("no-scroll");
  }, [modalVisible]);

  const handleClickOutside = useCallback((event) => {
    if (
      recentSearchesRef.current &&
      !recentSearchesRef.current.contains(event.target)
    ) {
      setShowRecentSearches(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <nav className="navbar navbar-expand-lg nav">
      <div className="container-fluid">
        <Link className="navbar-brand me-5" to="/">
          <h4>MovieStreamer</h4>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item me-5">
              <Link
                className="a nav-link active"
                aria-current="page"
                to="/movies"
              >
                Movies
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="a nav-link active" to="/webseries">
                Series
              </Link>
            </li>
            <li className="nav-item me-5">
              <button className="a nav-link active btn btn-link" style={{ border: 'none', background: 'none', padding: 0 }}>
                Contact
              </button>
            </li>
            <li className="nav-item me-5">
              <Link className="a nav-link active" to="/about">
                About Us
              </Link>
            </li>
          </ul>
          <form className="d-flex search-form" role="search">
            <div className="input-group">
              <input
                className="input form-control rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ width: "358px" }}
                onFocus={() => setShowRecentSearches(true)}
                value={movieName}
                onChange={handleInputChange}
              />
              <span className="input-group-text bg-transparent border-0 search-icon">
                <GoSearch />
              </span>
            </div>
            <button
              type="button"
              className="btn btn-outline-dark ms-3"
              onClick={() => setModalVisible(true)}
              aria-label="Sign up"
            >
              SignUp
            </button>
            <Modal
              isOpen={modalVisible}
              onRequestClose={() => setModalVisible(false)}
              style={customModalStyles}
              ariaHideApp={false}
            >
              <Register />
            </Modal>
            {showRecentSearches && (
              <div ref={recentSearchesRef} className="recent-searches-dropdown">
                <RecentSearches />
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
