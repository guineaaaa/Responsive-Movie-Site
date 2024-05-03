// MainPage.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import Footer from './Footer';


// Styled components
const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WelcomeBanner = styled.div`
  text-align: center;
  background-color: black;
  color: white;
  padding: 10%;
  font-size: 28px;
  width: 100%;
  height: 50%;
`;

const FindMovieBanner = styled.div`
  text-align: center;
  background-color: #0a0a5c;
  font-size: 30px;
  width: 100%;
  padding: 10%;
  height: 30%;
  color: white;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-top: 20px;
`;

// Main page component
const MainPage = () => {
  return (
    <MainPageContainer>
      <Navbar /> {/* Include the Navbar component */}
      <WelcomeBanner><strong>환영합니다</strong></WelcomeBanner>
      <FindMovieBanner>
        <strong>🎥Find your movies!</strong>
        <br />
        <SearchInput type="text" placeholder="Search for movies..." />
      </FindMovieBanner>
      <Footer />
    </MainPageContainer>
  );
};

export default MainPage;
