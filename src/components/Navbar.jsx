import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #080845;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  z-index: 999;
`;

const Brand = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  &:hover {
    color: yellow;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px; /* Reduce the gap between buttons */
  max-width: 50%;
  overflow-x: auto; /* Allow horizontal scrolling */
  padding-right: 40px; /* Add right padding to accommodate scrollbar */
`;

const NavLinkButton = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
  &.active {
    color: yellow;
  }
`;




const Navbar = () => {
 
  return (
    <NavbarContainer>
      <Brand to="/" exact>UMC Movie</Brand>
      <ButtonContainer>
        <NavLinkButton to="/signup" activeClassName="active">회원가입</NavLinkButton>
        <NavLinkButton to="/popular" activeClassName="active">Popular</NavLinkButton>
        <NavLinkButton to="/now-playing" activeClassName="active">Now Playing</NavLinkButton>
        <NavLinkButton to="/top-rated" activeClassName="active">Top Rated</NavLinkButton>
        <NavLinkButton to="/upcoming" activeClassName="active">Upcoming</NavLinkButton>
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default Navbar;
