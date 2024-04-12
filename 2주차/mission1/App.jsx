import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import './App.css';

function App() {
    //할일 목록 상태 선언+초기화
  const [todos, setTodos] = useState([
    { id: 1, content: "Send E-mail", isDone: false },
    { id: 2, content: "Make Work-Books", isDone: false },
    { id: 3, content: "Sleeping", isDone: true },
    { id: 4, content: "Watching You-Tube", isDone: true },
  ]);

  //새로운 할 일 추가 함수
  const handleAddTodo = (content) => {
    // 새로운 할 일 객체 생성하기
    const newTodo = {
      id: todos.length + 1,
      content: content,
      isDone: false
    };
    //이전의 할 일 목록에 새로운 할 일을 추가해 상태 업데이트하기
    setTodos([...todos, newTodo]);
  };

  //할 일 완료 상태 변경 함수
  const handleToggleTodo = (id) => {
    // 클릭한 할 일의 완료 상태를 변경해서 상태 업데이트하기
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    // 삭제할 할 일 객체 가져오기
    const deletedTodo = todos.find(todo => todo.id === id);
    // 삭제된 할 일을 제외한 새로운 할일의 목록을 생성하기
    const updatedTodos = todos.filter(todo => todo.id !== id);
    // 만약 삭제된 할일이 완료되지 않은 경우
    if (!deletedTodo.isDone) {
      // 해당 할 일을 완료 상태로 변경하고 새로운 할 일 목록에 추가하기
      const newTodo = { ...deletedTodo, isDone: true };
      setTodos([...updatedTodos, newTodo]);
    } else {
      // 완료된 할 일은 그냥 삭제하기
      setTodos(updatedTodos);
    }
  };
  
 

  return (
    <div className="main">
      <h1>UMC Study Plan</h1>
      <hr />
      {/*할일 추가 입력 컴포넌트*/}
      <TodoInput onAdd={handleAddTodo} />
       {/*할 일 목록*/}
      <div className="tasksBoard">
         {/*해야 할일의 목록 */}
        <div>
          <h2>해야 할 일</h2>
          <br />
          <ul id="todoList">
             {/*완료되지 않은 할일 목록 */}
            {todos.filter(todo => !todo.isDone).map(todo => (
              <li key={todo.id}>
                 {/*할 일 내용 */}
                <span>{todo.content}</span>
                 {/*완료 버튼 */}
                <button onClick={() => handleToggleTodo(todo.id)}>완료</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
        {/*해낸 일 목록*/}
          <h2>해낸 일</h2>
          <br />
          <ul id="completedList">
             {/*완료된 할 일 목록 */}
            {todos.filter(todo => todo.isDone).map(todo => (
              <li key={todo.id}>
                 {/*할 일 내용*/}
                <span>{todo.content}</span>
                 {/*삭제 버튼*/}
                <button onClick={() => {
                  handleDeleteTodo(todo.id);
                // 삭제된 할일이 완료되지 않은 경우, 다시 해야 할일 목록에
                  const newTodo = { ...todo, isDone: false };
                  setTodos([...todos, newTodo]);
                }}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
