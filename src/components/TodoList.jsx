import React, { useEffect, useState } from "react";
import { useTodos } from "./useTodo";

function TodoList() {
  const { todoArray, setTodoArray, setInputValue } = useTodos();

  const [showCompleted, setShowCompleted] = useState(false);
  function loadTodos() {
    let fectched = localStorage.getItem("todos");
    if (fectched) {
      setTodoArray(JSON.parse(fectched));
    }
  }
  function handleEdit(id) {
    let todo = todoArray.filter((todo) => todo.id === id);
    setInputValue(todo[0].title);
    let newTodoArray = todoArray.filter((todo) => todo.id !== id);
    setTodoArray(newTodoArray);
    localStorage.setItem("todos", JSON.stringify(newTodoArray));
  }
  function handleDelete(id) {
    let newTodoArray = todoArray.filter((todo) => todo.id !== id);
    setTodoArray(newTodoArray);
    localStorage.setItem("todos", JSON.stringify(newTodoArray));
  }
  function handleToggle(id) {
    let newTodoArray = todoArray.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    });
    setTodoArray(newTodoArray);
    localStorage.setItem("todos", JSON.stringify(newTodoArray));
  }
  function toggleShowCompleted() {
    setShowCompleted(!showCompleted);
  }
  useEffect(() => {
    loadTodos();
  }, []);
  return (
    <div className="todo-list flex flex-col gap-3">
      <button className="self-start flex gap-2">
        <input
          type="checkbox"
          name="completedDisplay"
          id=""
          onChange={toggleShowCompleted}
          checked={showCompleted}
        />
        Show Completed
      </button>
      {/* Todo items will go here */}
      {todoArray.length === 0 ? (
        <p className="text-gray-400 text-center">No todos available</p>
      ) : (
        todoArray.map(
          (todo, index) =>
            (showCompleted || !todo.isCompleted) && (
              <div
                key={index}
                className="todo-item flex justify-between gap-3 items-center bg-neutral-700 p-3 rounded-lg"
              >
                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    value={todo.isCompleted}
                    className="w-5 h-5 accent-green-500 cursor-pointer"
                    onChange={() => handleToggle(todo.id)}
                    checked={todo.isCompleted}
                  />
                  <p className={todo.isCompleted ? "line-through" : ""}>
                    {todo.title}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => {
                      handleEdit(todo.id);
                    }}
                    className="bg-neutral-500 px-5 py-2 rounded-md cursor-pointer hover:bg-neutral-600 disabled:cursor-not-allowed"
                    disabled={todo.isCompleted === true}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(todo.id);
                    }}
                    className="bg-red-700 px-3 py-2 rounded-md hover:bg-red-800 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
        )
      )}
    </div>
  );
}

export default TodoList;
