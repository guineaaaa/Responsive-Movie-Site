import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
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
  padding: 8%;
  font-size: 28px;
  width: 100%;
  
`;

const FindMovieBanner = styled.div`
  text-align: center;
  background-color: #0a0a5c;
  font-size: 30px;
  width: 100%;
  padding: 5%;
  height: 30%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-top: 20px;
`;




const SearchResultContainer = styled.div`
  margin-top:3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 500px;
  max-width: 80%;
  overflow-y: auto;
  width: 100%;
  background-color:#080845;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: #edbb32; /* 스크롤바 색상 */
    border-radius: 10px; /* 스크롤바 모양 */
  }

  &::-webkit-scrollbar-track {
    background: #05052e; /* 스크롤바 트랙 색상 */
  }
`;

const MovieCard = styled.div`
  flex: 0 0 calc(19% - 15px); /* 25%를 차지하고 margin이 20px이므로 여백을 고려하여 너비 설정 */
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 20px;
  position: relative;
  background-color: rgb(32, 32, 124);
  color: white;
  overflow: hidden;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgba(32, 32, 124, 0.9);
  }
`;

const MovieTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`;

const MovieRating = styled.p`
  font-size: 16px;
  margin-left: 60%;
  margin-bottom: 5px;
`;

const MoviePoster = styled.img`
  max-width: 100%;
  border-radius: 5px;
  transition: filter 0.3s;
  ${MovieCard}:hover & {
    filter: brightness(70%);
  }
`;

const API_KEY = process.env.REACT_APP_API_KEY;

// Main page component
const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState(''); //검색어 상태 관리
  const [searchResults, setSearchResults] = useState([]); //검색 결과 상태 관리

  //검색어 입력 핸들러
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value); //입력된 검색어를 상태 변수에 저장함
  };

  useEffect(() => {
    const fetchData = async () => {
      // 검색어가 빈 문자열이면 검색 결과를 초기화 하고 return 한다
      if (searchQuery.trim() === '') {
        setSearchResults([]);
        return;
      }

      try {
        //영화 DB API로 검색 요청을 보낸다
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
        const data = await response.json(); //응답 데이터를 JSON 형식으로 변환
        setSearchResults(data.results); // 검색 결과를 상태 변수에 저장
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData(); //fetchData() 실행
  }, [searchQuery]); //SearchQuery 값이 변경 될때 마다 useEffect()가 실행됨

  return (
    <MainPageContainer>
      <Navbar />
      <WelcomeBanner><strong>환영합니다</strong></WelcomeBanner>
      <FindMovieBanner>
        <strong>🎥Find your movies!</strong>


        <SearchInput
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleInputChange}
        />

        <SearchResultContainer>
          {searchResults && searchResults.length > 0 && searchResults.map(movie => (
            <MovieCard key={movie.id}>
              <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>⭐ {movie.vote_average}</MovieRating>
            </MovieCard>
          ))}
        </SearchResultContainer>

      </FindMovieBanner>
      <Footer />
    </MainPageContainer>
  );
};

export default MainPage;
