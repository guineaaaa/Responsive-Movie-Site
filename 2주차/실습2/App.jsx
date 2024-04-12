import React, { useState } from 'react';
import Modal from './components/Modal.jsx'; // Modal 컴포넌트를 불러오기
import './App.css'; // App.css 파일을 불러오기

function App() {
  // 모달 열기/닫기 상태를 관리하는 useState 훅
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
    console.log("모달이 켜짐");
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setIsModalOpen(false);
    console.log("모달이 꺼짐");
  };

  return (
    <div>
      <h1>안녕하세요!</h1>
      <p>내용내용내용</p>
      {/* 모달 열기 버튼 */}
      <button onClick={openModal}>버튼 열기</button>

      {/* 모달이 열려있는 상태인 경우에만 오버레이&모달 컴포넌트를 렌더링 */}
      {isModalOpen && (
        <div className="overlay">
          <Modal closeModal={closeModal}> {/* 모달 컴포넌트를 렌더링하고, 모달 닫기 함수를 props로 전달 */}
            {/* 모달 내부에 있는 닫기 버튼 */}
            <button onClick={(e) => {
              e.stopPropagation();
              {/*e.stopPropagation은 이벤트의 전파를 중단시키는
            메서드 이다.*/}
              console.log("모달이 꺼졌다");
            }}>닫기</button>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default App;
