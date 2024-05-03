// Navbar.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #0a0a5c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  z-index: 999;
`;

const Brand = styled.div`
  color: white;
  font-weight: bold;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; /* Reduce the gap between buttons */
  max-width: 50%;
  overflow-x: auto; /* Allow horizontal scrolling */
  padding-right: 40px; /* Add right padding to accommodate scrollbar */
`;

const Button = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Brand>UMC</Brand>
      <ButtonContainer>
        <Button to="/popular">Popular</Button>
        <Button to="/now-playing">Now Playing</Button>
        <Button to="/top-rated">Top Rated</Button>
        <Button to="/upcoming">Upcoming</Button>
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default Navbar;
