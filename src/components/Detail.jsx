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
  background-repeat: no-repeat;
  color: white;
`;

const MovieInfo = styled.div`
  position: absolute;
  top: 0; 
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 10, 92, 0.7);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-right: 40px; 
  padding-left: 30px;
`;

const MovieContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 40px;
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 60px;
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
  text-overflow: clip;
  width: 600px;
`;

const MovieReleaseDate = styled.p`
  font-size: 16px;
`;

const MoviePoster = styled.img`
  max-width: 250px;
  max-height: 100%;
  border-radius: 5px;
`;

const PeopleContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

const People = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Person = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const PersonImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 5px;
`;

const PersonInfo = styled.div`
  text-align: center;
`;

const API_KEY = process.env.REACT_APP_API_KEY;

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [koreanOverview, setKoreanOverview] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const data = await response.json();
        setMovie(data);

        const koreanResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko`);
        const koreanData = await koreanResponse.json();
        setKoreanOverview(koreanData.overview);

        const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
        const creditsData = await creditsResponse.json();
        
        setCredits(creditsData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    getMovie();
  }, [id]);

  useEffect(() => {
    if (movie) {
      document.body.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`;
    }
    return () => {
      document.body.style.backgroundImage = 'none';
    };
  }, [movie]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  //이미지 없음을 표시
  const handleError = (e) => {
    e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';
  };

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
        <MovieContent>
          <MoviePoster 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={`${movie.title} Poster`} 
            onError={handleError}
          />
          <MovieDetails>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieRating>
              <strong>평점</strong> {'⭐'.repeat(Math.max(1, Math.floor(movie.vote_average)))}
            </MovieRating>
            <MovieReleaseDate><strong>개봉일 {movie.release_date}</strong></MovieReleaseDate>
            {overviewContent}
          </MovieDetails>
        </MovieContent>

        <div>
            <People>출연진 및 제작진</People>
          </div>
        <PeopleContainer>
          {credits && credits.cast && credits.cast.length > 0 ? (
            credits.cast.map((person) => (
              <Person key={person.cast_id}>
                <PersonImg 
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} 
                  alt={`${person.name}`} 
                  onError={handleError}
                />
                <PersonInfo>
                  {person.name}
                  <p>{person.character}</p>
                </PersonInfo>
              </Person>
            ))
          ) : (
            <p>출연진 정보가 없습니다.</p>
          )}
        </PeopleContainer>
      </MovieInfo>
    </DetailContainer>
  );
};

export default Detail;
