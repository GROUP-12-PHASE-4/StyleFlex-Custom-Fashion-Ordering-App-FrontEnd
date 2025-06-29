import React from "react";
import "../App.css"; 

function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-message">Sorry, the page you’re looking for doesn’t exist.</p>
    </div>
  );
}

export default NotFound;
