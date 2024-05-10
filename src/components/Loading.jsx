import React from 'react';
import Spinner from '../Spinner.gif'; // 이미지 경로 수정

const Loading01 = () => {
    return (
        <div>
            <h3>로딩중!</h3>
            <img src={Spinner} alt="로딩" />
        </div>
    );
};

export default Loading01;
