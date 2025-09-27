import React, { useState, useEffect } from "react";
import { TodoContext } from "./TodoContext";

export function TodoProvider({ children }) {
  const [todoArray, setTodoArray] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetched = JSON.parse(localStorage.getItem("todos")) || [];
    setTodoArray(fetched);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoArray));
  }, [todoArray]);

  return (
    <TodoContext.Provider
      value={{ todoArray, setTodoArray, inputValue, setInputValue }}
    >
      {children}
    </TodoContext.Provider>
  );
}
