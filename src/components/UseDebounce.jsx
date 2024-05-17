import {useState, useEffect} from 'react';

// value: 디바운스 할 값, delay number: 지연 시간
export default function UseDebounce(value, delay=500){
    const [debounced, setDebounced]=useState(value);
    // debounced: 지연될 값 저장할 상태, setDebounced: 지연된 값 업데이트

    useEffect(()=>{
        //setTimeout으로 지연 시간을 설정하기
        const handler=setTimeout(()=>setDebounced(value),delay);

        // 컴포넌트가 언마운트 되거나 value또는 delay가 변경될때
        // 이전 타이머를 정리한다
        return ()=>clearTimeout(handler);

    }, [value, delay]);
    // value나 delay가 변경될 때마다 ..

    
    // 지연된 값 반환
    return debounced;
}