import { useState, useEffect } from "react";
import InputTask from "./InputTasks";
import ToDoList from "./TasksList/TodoList";
import FilterMain from "./Filters/FilterMain";
import ActiveTasks from "./Filters/ActiveTasks";

function ToDoListMain() {
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
      <InputTask setTasks={setTasks} />
      <ToDoList filter={filter} tasks={tasks} setTasks={setTasks} />
      <FilterMain setFilter={setFilter} />
      <ActiveTasks tasks={tasks} setTasks={setTasks} />
    </>
  );
}
export default ToDoListMain;
