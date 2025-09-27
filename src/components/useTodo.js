import { useContext } from "react";
import { TodoContext } from "./TodoContext";

export const useTodos = () => useContext(TodoContext);
