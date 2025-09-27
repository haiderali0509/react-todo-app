import InputTdo from "./components/InputTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="main-container w-1/2 mx-auto bg-[rgba(59,59,59,0.33)] text-white rounded-md p-5 mt-5">
        <h1 className="text-4xl font-bold text-center">ITask</h1>
        <div className="flex flex-col gap-4">
          <h2 className="self-start font-bold text-xl">Add Todo</h2>
          <InputTdo />
          <h2 className="self-start font-bold text-xl">Todo List</h2>
          <TodoList />
        </div>
      </div>
    </>
  );
}

export default App;
