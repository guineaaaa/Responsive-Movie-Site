import React from 'react';

// Modal 컴포넌트 정의
function Modal({ closeModal }) {
  return (
    // 모달을 감싸는 div 요소
    <div className="modal">
      {/* 모달 내용을 담는 div 요소 */}
      <div className="modal-content">
        {/* 모달 닫기 버튼 */}
        <span className="close" onClick={closeModal}></span>
        {/* 모달 내용 */}
        <h1>안녕하세요</h1>
        <p>안녕하세요! 모달 내용은 어쩌고 저쩌고...</p>
        {/* 모달 닫기 버튼 */}
        <button onClick={closeModal}>닫기</button>
      </div>
    </div>
  );
}

// Modal 컴포넌트를 외부로 내보냄
export default Modal;
