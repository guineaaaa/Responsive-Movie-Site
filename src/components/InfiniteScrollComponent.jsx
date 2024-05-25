import React, { useState } from 'react';
// InfiniteScroll 컴포넌트를 라이브러리에서 가져오기
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './Loading';

const InfiniteScrollComponent = () => {
    //items 상태의 초기값으로 길이 20의 배열로 설정
    const [items, setItems] = useState(Array.from({ length: 20 }));

    // 데이터를 가져오는 함수
    const fetchData = () => {
        // 1.5초 뒤에 새로운 데이터를 기존 데이터에 추가한다
        setTimeout(() => {
            setItems(items.concat(Array.from({ length: 20 })));
            //기존 배열에 +길이 20의 새 배열 추가
        }, 1500);
    };

    return (
        <>
            <InfiniteScroll
                dataLength={items.length} //현재까지 로드된 데이터의 길이설정
                next={fetchData} // 스크롤이 끝에 도달했을때 호출되는 함수
                hasMore={true} // 더 많은 데이터를 로드 할 수 있는지 나타냄
                loader={<Loading />}
            >
                {items.map((_, index) => (
                    // 각 아이템 렌더링
                    <div key={index}>
                        div - #{index} {/*각 아이템에 고유한 키를 부여하고 인덱스 표시*/}
                    </div>
                ))}
            </InfiniteScroll>
        </>
    );
}

export default InfiniteScrollComponent;
