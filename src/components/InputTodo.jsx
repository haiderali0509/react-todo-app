import React, { useState, useEffect } from "react";
import { useTodos } from "./useTodo";
import { v4 as uuidv4 } from "uuid";

function InputTodo() {
  const { todoArray, setTodoArray } = useTodos();
  const {inputValue, setInputValue} = useTodos();

  let [fetchedData, setFetchedData] = useState([]);

  function handleChange(e) {
    setInputValue(e.target.value);
  }
  function handleAddTodo() {
    if (inputValue.trim() === "") return;
    const newTodo = {
      id: uuidv4(),
      title: inputValue,
      isCompleted: false,
    };
    let newTodoArray = [...todoArray, newTodo];
    setTodoArray(newTodoArray);
    localStorage.setItem("todos", JSON.stringify(newTodoArray));
    setInputValue("");
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  }
  useEffect(() => {
    let fetched = localStorage.getItem("todos");
    if (fetched) {
      setFetchedData(JSON.parse(fetched));
    }
    setTodoArray(fetchedData);
  }, []);
  return (
    <div>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Add Todo"
          className="w-full px-3 outline-none border-2 border-[rgba(118,4,218,0)] focus:border-2 focus:border-[rgba(141,40,230,0.67)] rounded-lg"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={inputValue}
        />
        <button
          className="px-5 py-2 bg-[rgba(118,4,218,0.5)] rounded-lg cursor-pointer hover:bg-[rgba(118,4,218,0.8)] transition-all duration-300 ease-in-out"
          onClick={handleAddTodo}
          
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default InputTodo;
