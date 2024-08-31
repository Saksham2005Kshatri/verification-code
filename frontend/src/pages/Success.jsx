import React from "react";
import { Link } from "react-router-dom";
import "./SuccessPage.css"; // Import the CSS file for styling

const Success = () => {
  return (
    <div className="successPage">
      <div className="successContent">
        <h1 className="successTitle">Success!</h1>
        <p className="successMessage">Your verification was successful.</p>
        <Link to="/" className="homeLink">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
