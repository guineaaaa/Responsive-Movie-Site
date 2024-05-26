import React from 'react';
import Spinner from '../Spinner.gif'; // 이미지 경로 수정
import styled from 'styled-components';

// 부모 div를 정중앙에 배치하기 위한 styled component
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // 화면의 전체 높이를 차지하도록 설정
  flex-direction: column; // 자식 요소들을 수직으로 배치
`;

// 이미지 스타일 설정
const LoadingImage = styled.img`
  width: 300px; 
  height: 300px; 
`;

const Loading01 = () => {
  return (
    <CenteredContainer>
      <h3>로딩중!</h3>
      <LoadingImage src={Spinner} alt="로딩" />
    </CenteredContainer>
  );
};

export default Loading01;
