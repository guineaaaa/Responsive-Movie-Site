import React, { useState } from 'react';

const IMG_BASE_URL="https://image.tmdb.org/t/p/w1280/";

export default function Movie({ title, poster_path, vote_average,overview }) {
    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className="movie-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <img src={IMG_BASE_URL + poster_path} alt="영화포스터" />
            {hovered && (
                <div className="movie-description">
                    <div className="title-wrapper">
                        <h5>{title}</h5>
                    </div>
                    <p>{overview}</p>
                </div>
            )}
            <div className="movie-info">
                <h4>{title}</h4>
                <span>{vote_average}</span>
            </div>
        </div>
    );
}
