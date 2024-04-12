import React, { useState } from 'react';


function TodoInput({ onAdd }) {

//할일 입력값을 상태로 관리한다
  const [taskInput, setTaskInput] = useState('');

  //입력값이 변경될때 호출되는 함수
  const handleInputChange = (e) => {
    //입력값을 상태에 업데이트
    setTaskInput(e.target.value);
  };

  // 폼을 제출할 때 호출되는 함수
  const handleFormSubmit = (e) => {
    // 폼의 기본 동작을 막음
    e.preventDefault();
    // 입력값이 비어있지 않다면
    if (taskInput.trim() !== '') {
        // 입력값을 콜백함수를 통해 부모 컴포넌트로 전달함
      onAdd(taskInput);
      // 입력값 초기화하기
      setTaskInput('');
    }
  };

  //할일 입력받는 폼을 렌더링
  return (
    <form onSubmit={handleFormSubmit} className="todo-input-container">
      <input
        type="text"
        placeholder="할 일을 작성하세요"
        value={taskInput}
        onChange={handleInputChange}
        className="todo-input"
      />
    </form>
  );
}

export default TodoInput;
