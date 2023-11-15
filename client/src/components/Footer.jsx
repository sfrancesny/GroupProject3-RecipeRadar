// src/components/Footer.jsx

import React from 'react';
import './componentStyles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-copy">
          &copy; 2023 RecipeRadar. All rights reserved.
        </p>
        {/* Placeholder for a share icon */}
        <div className="footer-share-icon">
          {/* Replace this div with an actual icon from an icon library if needed */}
          <span>Share</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
