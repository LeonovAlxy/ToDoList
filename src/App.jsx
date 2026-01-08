import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import InputTask from "./InputTasks";
import { TasksProvider } from "./TasksContext";
import ToDoList from "./TasksList/TodoList";

function App() {
  return (
    <TasksProvider>
      <Header />
      <InputTask />
      <ToDoList />
    </TasksProvider>
  );
}

export default App;
