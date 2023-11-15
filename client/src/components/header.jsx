// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  align-items: center;
  background-color: rgba(128, 70, 27, 0.5);
  color: white;
  padding: 5px;
  margin: 0;
  display: flex;
  justify-content: space-between; // Align items between header sides
`;

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
`;

const StyledLi = styled.li`
  margin: 0 12px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcc00;
  }
`;

const StyledButton = styled.button`
  background: none;
  border: 1px solid white;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: white;
    color: #333;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <StyledHeader>
      <h2>RecipeRadar</h2>
      <StyledNav>
        <StyledUl>
          <StyledLi><StyledLink to="/">Home</StyledLink></StyledLi>
          <StyledLi><StyledLink to="/create-recipe">Create Recipe</StyledLink></StyledLi>
          <StyledLi><StyledLink to="/signup">Signup</StyledLink></StyledLi>
        </StyledUl>
        <StyledUl>
          <StyledLi><StyledButton onClick={() => navigate('/login')}>Login</StyledButton></StyledLi>
          <StyledLi><StyledButton onClick={handleLogout}>Logout</StyledButton></StyledLi>
        </StyledUl>
      </StyledNav>
    </StyledHeader>
  );
};

export default Header;
