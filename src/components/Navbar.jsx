import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

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
  font-size: 16px;
`;

const SidebarIcon = styled.div`
  color: white;
  font-size: 30px;
  cursor: pointer;
  width:2em;
`;

const SidebarMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: #080845;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 60px;
  transform: ${({ isActive }) => (isActive ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1001;
`;

const SidebarLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  padding: 10px 20px;
  width: 100%;
  background-color: #0a0a5c;
  overflow-y: auto;
  &:hover {
    color: yellow;
  }
  &.active {
    color: yellow;
  }
`;

const Overlay = styled.div`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
`;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isBigScreen = useMediaQuery({ minWidth: 769 });
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
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
    <>
      {isBigScreen && (
        <NavbarContainer>
          <Brand to="/" exact="true">UMC Movie</Brand>
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
      )}
      {isSmallScreen && (
        <>
          <NavbarContainer>
            <Brand to="/" exact="true">UMC Movie</Brand>
            <SidebarIcon onClick={() => setIsActive(!isActive)}>☰</SidebarIcon>
          </NavbarContainer>
          <Overlay isActive={isActive} onClick={() => setIsActive(false)} />
          <SidebarMenu isActive={isActive}>
            <NavbarContainer>
              <Brand to="/" exact="true">UMC Movie</Brand>
              <SidebarIcon onClick={() => setIsActive(false)}>☰</SidebarIcon>
            </NavbarContainer>
            {isLoggedIn ? (
              <SidebarLink as="div" onClick={() => { handleLogout(); setIsActive(false); }}>로그아웃</SidebarLink>
            ) : (
              <>
                <SidebarLink to="/signup" activeClassName="active" onClick={() => setIsActive(false)}>회원가입</SidebarLink>
                <SidebarLink to="/login" activeClassName="active" onClick={() => { handleLogin(); setIsActive(false); }}>로그인</SidebarLink>
              </>
            )}
            <SidebarLink to="/popular" activeClassName="active" onClick={() => setIsActive(false)}>Popular</SidebarLink>
            <SidebarLink to="/now-playing" activeClassName="active" onClick={() => setIsActive(false)}>Now Playing</SidebarLink>
            <SidebarLink to="/top-rated" activeClassName="active" onClick={() => setIsActive(false)}>Top Rated</SidebarLink>
            <SidebarLink to="/upcoming" activeClassName="active" onClick={() => setIsActive(false)}>Upcoming</SidebarLink>
          </SidebarMenu>
        </>
      )}
    </>
  );
};

export default Navbar;
