// src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <h3>RecipeRadar</h3>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li> 
          <li><Link to="/create-recipe">Create Recipe</Link></li> 
        </ul>
      </nav>
    </header>
  );
};

export default Header;
