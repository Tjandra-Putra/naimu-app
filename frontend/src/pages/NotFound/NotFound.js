import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-wrapper">
      <div className="container">
        <h1>404</h1>
        <p>The page you are looking for does not exist!</p>
        <Link to="/" className="btn btn-lg btn-dark">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
