import React from 'react';
import './LandingPage.css';

const LandingPage = (props) => {
  return (
    <div className="LandingPage">
      <h4>Landing Page</h4>
      <p>{props.leagues}</p>
    </div>
  );
};

export default LandingPage;
