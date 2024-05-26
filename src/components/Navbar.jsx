import React, { useState, useEffect } from 'react';
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
  gap: 20px;
  max-width: 50%;
  overflow-x: auto;
  padding-right: 40px;
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

const LogoutButton = styled.button`
  text-decoration: none;
  color: #fff;
  background: none;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
  font-size:16px;
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status from localStorage when the component mounts
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <NavbarContainer>
      <Brand to="/" exact>UMC Movie</Brand>
      <ButtonContainer>
        {isLoggedIn ? (
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        ) : (
          <>
            <NavLinkButton to="/signup" activeClassName="active">회원가입</NavLinkButton>
            <NavLinkButton to="/login" activeClassName="active" onClick={handleLogin}>로그인</NavLinkButton>
          </>
        )}
        <NavLinkButton to="/popular" activeClassName="active">Popular</NavLinkButton>
        <NavLinkButton to="/now-playing" activeClassName="active">Now Playing</NavLinkButton>
        <NavLinkButton to="/top-rated" activeClassName="active">Top Rated</NavLinkButton>
        <NavLinkButton to="/upcoming" activeClassName="active">Upcoming</NavLinkButton>
      </ButtonContainer>
    </NavbarContainer>
  );
};

export default Navbar;
