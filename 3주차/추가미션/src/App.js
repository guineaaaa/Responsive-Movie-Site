import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import NowPlayingPage from './components/NowPlayingPage';
import PopularPage from './components/Popularpage';
import TopRatedPage from './components/TopRatedPage';
import UpcomingPage from './components/UpComingPage';
import Loading from './components/Loading'; // Loading 컴포넌트를 import
import './App.css';

function App() {
  // 로딩 상태를 추적하는 상태 useState 훅 사용
  const [isLoading, setIsLoading] = useState(false);
  // 로딩 창을 보고 싶으면 useState(true);

  return (
    <div>
      {/* 네비게이션 바 컴포넌트 */}
      <Navbar />

      {/* 로딩 상태가 true이면 로딩 컴포넌트를 렌더링 */}
      {isLoading && <Loading />}

      {/* 라우트 설정 */}
      <Routes>
        {/* 메인 페이지 */}
        <Route
          path="/"
          element={<MainPage setIsLoading={setIsLoading} />} // 메인 페이지에 로딩 상태 변경 함수를 props로 전달
        />
        
        {/* 현재 상영 중 페이지 */}
        <Route
          path="/now-playing"
          element={<NowPlayingPage setIsLoading={setIsLoading} />} // 현재 상영 중 페이지에 로딩 상태 변경 함수를 props로 전달
        />

        {/* 인기 있는 영화 페이지 */}
        <Route
          path="/popular"
          element={<PopularPage setIsLoading={setIsLoading} />} // 인기 있는 영화 페이지에 로딩 상태 변경 함수를 props로 전달
        />

        {/* 평점 높은 영화 페이지 */}
        <Route
          path="/top-rated"
          element={<TopRatedPage setIsLoading={setIsLoading} />} // 평점 높은 영화 페이지에 로딩 상태 변경 함수를 props로 전달
        />

        {/* 개봉 예정 영화 페이지 */}
        <Route
          path="/upcoming"
          element={<UpcomingPage setIsLoading={setIsLoading} />} // 개봉 예정 영화 페이지에 로딩 상태 변경 함수를 props로 전달
        />
      </Routes>

      {/* 푸터 컴포넌트 */}
      <Footer />
    </div>
  );
}

export default App;
