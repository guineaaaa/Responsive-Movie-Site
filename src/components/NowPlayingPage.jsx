import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading'; // Loading 컴포넌트를 가져옵니다.

const NowPlayingContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #0a0a5c;
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

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      setMovies(prevMovies => [...prevMovies, ...data.results]);
      if (data.results.length === 0 || data.results.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, [page]);

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={() => setPage(prevPage => prevPage + 1)}
      hasMore={hasMore}
      loader={<Loading />}
    >
      <NowPlayingContainer>
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard>
              <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>⭐ {movie.vote_average}</MovieRating>
            </MovieCard>
          </Link>
        ))}
      </NowPlayingContainer>
    </InfiniteScroll>
  );
};

export default NowPlayingPage;
