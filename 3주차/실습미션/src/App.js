// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import NowPlayingPage from './components/NowPlayingPage';
import PopularPage from './components/Popularpage';
import TopRatedPage from './components/TopRatedPage';
import UpcomingPage from './components/UpComingPage';
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
