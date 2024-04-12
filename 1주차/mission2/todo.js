document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const todoList = document.getElementById('todoList');
    const completedList = document.getElementById('completedList');

    // 할 일 목록에 항목 추가
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (taskInput.value.trim() === '') return; // 빈 입력 방지

        const taskText = taskInput.value;

        const li = document.createElement('li');
        const taskTextNode = document.createTextNode(taskText);
        li.appendChild(taskTextNode);

        const completeButton = document.createElement('button');
        completeButton.textContent = '\t\t완료';
        completeButton.addEventListener('click', function () {
            moveTaskToCompleted(li);
        });

        li.appendChild(completeButton);
        todoList.appendChild(li); // 할 일 목록의 맨 끝에 추가
        taskInput.value = ''; // 입력창 초기화
    });

    // 완료한 일 목록으로 이동
    function moveTaskToCompleted(taskItem) {
        taskItem.removeChild(taskItem.lastChild); // '완료' 버튼 삭제
        completedList.appendChild(taskItem);
    }
});
