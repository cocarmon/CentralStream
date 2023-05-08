import React from 'react';

import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const handleToggle = () => {
    const body = document.querySelector('body');
    const cards = document.querySelector('body');
  };
  return (
    <div className="modeToggler">
      <input type="checkbox" id="darkmode-toggle" />
      <label for="darkmode-toggle" id="darkmode-toggle-label" />
    </div>
  );
};

export default DarkModeToggle;
