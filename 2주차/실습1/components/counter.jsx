import React, {useState} from "react";
//React 라이브러리에서 'react'모듈과 useState 훅을 불러온다

//Counter 함수형 Component를 정의
const Counter=()=>{
    const [count,setCount]=useState(0);
    // count상태와 setCount 함수를 생성하고, 초기값을 0으로 설정한다

    // 숫자를 증가시키는 함수를 정의한다.
    const onIncrease=()=>{
        setCount(prevCount=>prevCount+1);
        // 이전 count 값을 가져와 +1한 값을 새로운 count값으로 설정
    };

    // 숫자를 감소시키는 함수를 정의한다.
    const onDecrease=()=>{
        setCount(prevCount=>prevCount-1);
     
           // 이전 count 값을 가져와 -1한 값을 새로운 count값으로 설정
     };


return(
    <div>
        <h2>{count}</h2>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
    </div>
);
};

export default Counter;
