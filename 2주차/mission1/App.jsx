import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import './App.css';

function App() {
  // 할일 목록 상태 선언+초기화
  const [todos, setTodos] = useState([
    { id: 1, content: "Send E-mail", isDone: false },
    { id: 2, content: "Make Work-Books", isDone: false },
    { id: 3, content: "Sleeping", isDone: true },
    { id: 4, content: "Watching You-Tube", isDone: true },
  ]);

  // 새로운 할일을 추가하는 함수
  const handleAddTodo = (content) => {
    //새로운 할 일 객체 생성하기
    const newTodo = {
      id: todos.length + 1, //할일의 ID는 현재 할일목록 길이에 1을 더한 값
      content: content, //할 일의 내용은 사용자가 입력한 내용
      isDone: false // 할일의 완료 상태 => false
    };
    // 이전의 할 일 목록에 새로운 할 일을 추가하고 상태 업데이트
    //setTodos는 이전 상태인 todos를 새로운 값으로 업데이트 하는 함수이다.
    //React에서는 상태를 직접 수정하는 것이 아닌, 상태 업데이트를 한다 따라서 setTodos함수 사용
    
    setTodos([...todos, newTodo]);
    // (...)을 사용해 기존의 todos배열과 객체 newTodo 배열을 합친다.
    // 따라서 새로운 할일이 이전의 할 일 목록에 추가된다
  };


  //할 일의 완료 여부를 변경하는 함수
  const handleToggleTodo = (id) => {
    // 이전 상태를 업데이트 하기위해 setTodos함수를 호출한다.
    setTodos(prevTodos => {
      //이전 상태를 순회하면서 각 할일의 완료 상태를 변경한 새로운 배열을 생성한다
      const updatedTodos = prevTodos.map(todo =>
        // 현재 순회 중인 할일의 id가 클릭한 할 일의 id와 일치하면,
        // 해당 할 일의 완료 상태를 반전 시킨다.
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
      //변경된 할 일 목록을 반환
      return updatedTodos;
    });
  };

  // 특정 id의 할일을 삭제하는데 사용된다.
  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }; //filter()는 조건을 만족하는 요소만을 새 배열에 포함시킨다.
  
  return (
    <div className="main">
      <h1>UMC Study Plan</h1>
      <hr />
      <TodoInput onAdd={handleAddTodo} />
      <div className="tasksBoard">
        <div>
          <h2>해야 할 일</h2>
          <br />
          <ul id="todoList">
            {todos.filter(todo => !todo.isDone).map(todo => (
              <li key={todo.id}>
                <span>{todo.content}</span>
                <button onClick={() => handleToggleTodo(todo.id)}>완료</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>해낸 일</h2>
          <br />
          <ul id="completedList">
            {todos.filter(todo => todo.isDone).map(todo => (
              <li key={todo.id}>
                <span>{todo.content}</span>
                <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
