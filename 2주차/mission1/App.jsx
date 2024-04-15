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

  const handleAddTodo = (content) => {
    const newTodo = {
      id: todos.length + 1,
      content: content,
      isDone: false
    };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
      return updatedTodos;
    });
  };

  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

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
