import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const DetailContainer = styled.div`
  padding: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 30%;
  background-position: center;
  background-repeat:no-repeat;
  color: white;
`;

const MovieInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(10, 10, 92, 0.7); /* 배경의 투명도를 조정 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right:40px;
  padding-left:30px;
  border-radius: 5px;
`;

const MovieTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const MovieRating = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const MovieOverview = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  text-overflow:clip;
  width:600px;
`;

const MovieReleaseDate = styled.p`
  font-size: 16px;
`;

const MoviePoster = styled.img`
  max-width: 250px;
  max-height: 100%;
  border-radius: 5px;
  margin-right:60px;
`;

const API_KEY=process.env.REACT_APP_API_KEY;


const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [koreanOverview, setKoreanOverview] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovie(data);

        const koreanResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko`);
        const koreanData = await koreanResponse.json();
        setKoreanOverview(koreanData.overview);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    getMovie();
  }, [id]);

  useEffect(() => {
    // 페이지가 처음 렌더링될 때와 movie가 변경될 때마다 배경 이미지를 설정합니다.
    if (movie) {
      document.body.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`;
    }
    
    // 컴포넌트가 언마운트될 때 배경 이미지 스타일을 제거합니다.
    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, [movie]);

  if (!movie) {
    return <div>Loading...</div>;
  }
  
  // 줄거리가 없는 경우를 처리합니다.
  const overviewContent = koreanOverview ? (
    <MovieOverview>
      <strong>줄거리</strong> <p>{koreanOverview}</p>
    </MovieOverview>
  ) : (
    <MovieOverview>
      <strong>줄거리</strong> <p>줄거리가 없습니다.</p>
    </MovieOverview>
  );
  
  return (
    <DetailContainer posterPath={movie.poster_path}>
      <MovieInfo>
        <MoviePoster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
  
        <div>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieRating>
            <strong>평점</strong> { '⭐'.repeat(Math.max(1, Math.floor(movie.vote_average))) }
          </MovieRating>
          <MovieReleaseDate><strong>개봉일 {movie.release_date}</strong></MovieReleaseDate>
          {overviewContent}
        </div>
      </MovieInfo>
    </DetailContainer>
  );
}
export default Detail; 