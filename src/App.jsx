import { useState, useEffect } from "react";
import Header from "./Header/Header";
import InputTask from "./InputTasks";
import ToDoList from "./TasksList/TodoList";
import FilterMain from "./Filters/FilterMain";
import ActiveTasks from "./Filters/ActiveTasks";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, title: "Купить что-то", isDone: false }];
  });
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  return (
    <>
      <Header />
      <InputTask setTasks={setTasks} />
      <ToDoList filter={filter} tasks={tasks} setTasks={setTasks} />
      <FilterMain setFilter={setFilter} />
      <ActiveTasks tasks={tasks} setTasks={setTasks} />
    </>
  );
}
// src/
// ├── App.js
// ├── Header/
// │   └── Header.js
// ├── InputTasks/
// │   └── InputTask.js
// ├── TasksList/
// │   ├── ToDoList.js
// │   └── Task.js
// │   └── TaskEdit.js
// ├── Filters/
// │   ├── Filter.js
// │   └── ActiveCounter.js
// ├── Sort/
//   └── Sort.js

export default App;
