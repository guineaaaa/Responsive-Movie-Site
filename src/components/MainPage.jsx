import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import UseDebounce from './UseDebounce';
import Loading from './Loading';

// Styled components
const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p { 
    font-size: 20em;
  }
`;

const WelcomeBanner = styled.div`
  text-align: center;
  background-color: black;
  color: white;
  padding: 4em;
  font-size: 2em;
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

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
`;

const SearchButton = styled.button`
  margin-left: 10px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 20px;
  background-color: #edbb32;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d4a429;
  }
`;

const SearchResultContainer = styled.div`
  margin-top: 3%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 500px;
  max-width: 80%;
  overflow-y: auto;
  width: 100%;
  background-color: #080845;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: #edbb32;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #05052e;
  }
`;

const MovieCard = styled.div`
  position: relative;
  width: 200px;
  margin: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(32, 32, 124);
  color: white;
  overflow: hidden;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(32, 32, 124, 0.9);

    & > div {
      opacity: 1;
    }
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

const MovieOverview = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const OverviewText = styled.p`
  font-size:8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 8; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const API_KEY = process.env.REACT_APP_API_KEY;

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const debouncedText = UseDebounce(searchQuery, 500);

  const fetchMovies = async (query) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=ko`;

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    setIsLoading(true); // 데이터를 받아오기 시작할 때 로딩 상태 true로 설정

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('검색 중 오류 발생', error);
    } finally {
      setIsLoading(false); // 데이터를 받아온 후 로딩 상태 false로 설정
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    fetchMovies(searchQuery);
  };

  useEffect(() => {
    fetchMovies(debouncedText);
  }, [debouncedText]);

  return (
    <MainPageContainer>
      <Navbar />
      <WelcomeBanner><strong>환영합니다</strong></WelcomeBanner>

      <FindMovieBanner>
        <strong>🎥Find your movies!</strong>

        <SearchContainer>
          <SearchInput type="text" placeholder="Search for movies..." value={searchQuery} onChange={handleInputChange} />
          <SearchButton onClick={handleSearchClick}>🔍</SearchButton>
        </SearchContainer>

        <SearchResultContainer>
          {isLoading ? (
            <p>데이터를 받아오는 중입니다...</p>
          ) : (
            searchResults && searchResults.length > 0 && searchResults.map(movie => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <MovieCard>
                  <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
                  <MovieTitle>{movie.title}</MovieTitle>
                  <MovieRating>⭐ {movie.vote_average}</MovieRating>
                  <MovieOverview>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <OverviewText>{movie.overview}</OverviewText>
                  </MovieOverview>
                </MovieCard>
              </Link>
            ))
          )}
        </SearchResultContainer>
      </FindMovieBanner>

      <Footer />
    </MainPageContainer>
  );
};

export default MainPage;
