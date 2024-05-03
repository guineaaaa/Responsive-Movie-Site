import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color:white;
  text-align:center;
`;

const BacktoMain=styled.button`
    border:none;
    font-size:20px;
    background:none;
    color:white;
`;

const Title=styled.h1`
    font-size:100px;
    margin-bottom: 15px;
`;

const Context=styled.h4`
    font-size:20px;
    margin-bottom: 15px;
`;


const NotFound = () => {
    const navigate = useNavigate();
    return (
        <NotFoundContainer>
            <Title>Oops!</Title>
            <Context>
            예상치 못한 에러가 발생했습니다.ㅠㅠ <br></br><br></br>
            <i>Not Found</i>
            </Context>
            <BacktoMain onClick={() => navigate('/')}>메인으로 돌아가기</BacktoMain>
               
        </NotFoundContainer>
    );
};

export default NotFound;
