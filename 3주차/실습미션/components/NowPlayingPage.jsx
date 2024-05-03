// NowPlayingPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const NowPlayingContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color:#0a0a5c;
`;

const MovieCard = styled.div`
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  position: relative;
  width: 250px;
  background-color: rgb(32, 32, 124);
  color: white;
  overflow: hidden; /* 포스터 위에 마우스를 올렸을 때 포스터 외부 영역에 설명이 나타나지 않도록 */
  transition: background-color 0.3s; /* 배경색 전환 애니메이션 */
  &:hover {
    background-color: rgba(32, 32, 124, 0.9); /* 마우스 호버 시 배경색 약간 어두워짐 */
  }
`;

const MovieTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 5px;
`;

const MovieRating = styled.p`
  font-size: 16px;
  margin-left:60%;
  margin-bottom: 5px;
`;

const MovieOverview = styled.p`
  font-size: 16px;
  opacity: 0; /* 초기에는 투명하게 설정 */
  transition: opacity 0.3s; /* 부드러운 투명도 전환 */
  position: absolute; /* 절대 위치 */
  top: 0; /* 상단 정렬 */
  left: 0; /* 좌측 정렬 */
  width: 100%; /* 부모 요소에 꽉 차도록 */
  height: 100%; /* 부모 요소에 꽉 차도록 */
  background-color: rgba(0, 0, 0, 0.7); /* 반투명한 배경색 */
  display: flex; /* Flexbox 레이아웃 사용 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
`;

const MoviePoster = styled.img`
  max-width: 100%;
  border-radius: 5px;
  transition: filter 0.3s; /* 이미지 전환 애니메이션 */
  ${MovieCard}:hover & {
    filter: brightness(70%); /* 마우스 호버 시 이미지 어두워짐 */
  }
  ${MovieCard}:hover ~ ${MovieOverview} {
    opacity: 1; /* 마우스 호버 시 설명 나타남 */
  }
`;

const API_KEY = '';

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching now playing movies:', error);
      }
    };

    fetchNowPlaying();
  }, []);

  return (
    <NowPlayingContainer>
      {movies.map(movie => (
        <MovieCard key={movie.id}>
          <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieRating>평점: {movie.vote_average}</MovieRating>
          <MovieOverview>{movie.overview}</MovieOverview>
        </MovieCard>
      ))}
    </NowPlayingContainer>
  );
};

export default NowPlayingPage;
