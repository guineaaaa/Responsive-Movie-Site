import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

// Styled components
const PopularContainer = styled.div`
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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  padding-bottom:80px;
`;

const API_KEY = process.env.REACT_APP_API_KEY;

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit] = useState(20); //한 페이지 당 20개의 결과 표시
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko&page=${page}`);
        const data = await response.json();
        setMovies(data.results);
        setTotal(data.total_results);
      } catch (error) {
        console.error('데이터를 받아 올 수 없습니다', error);
      }
    };

    fetchPopular();
  }, [page]);

  return (
    <>
      <PopularContainer>
        {movies.map(movie => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard>
              <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieRating>⭐{movie.vote_average}</MovieRating>
            </MovieCard>
          </Link>
        ))}
      </PopularContainer>
      <PaginationWrapper>
        <Pagination total={total} limit={limit} page={page} setPage={setPage} />
      </PaginationWrapper>
    </>
  );
};

export default PopularPage;
