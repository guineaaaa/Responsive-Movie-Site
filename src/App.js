import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import NowPlayingPage from './components/NowPlayingPage';
import PopularPage from './components/Popularpage';
import TopRatedPage from './components/TopRatedPage';
import UpcomingPage from './components/UpComingPage';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import Detail from './components/Detail'; // Detail 컴포넌트를 import
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/now-playing" element={<NowPlayingPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        {/* 영화 상세 정보 페이지에 대한 라우트 */}
        <Route path="/movie/:id" element={<Detail />} />
        {/* Not found 경로에 대한 라우트 */}
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;