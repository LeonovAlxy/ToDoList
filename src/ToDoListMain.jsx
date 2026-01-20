import { useState, useEffect } from "react";
import axios from "axios";
import InputTask from "./InputTasks";
import ToDoList from "./TasksList/TodoList";
import FilterMain from "./Filters/FilterMain";
import ActiveTasks from "./Filters/ActiveTasks";

function ToDoListMain() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const getAllTasks = async () => {
    try {
      const responseAllTasks = await axios.get(
        "https://todo-redev.herokuapp.com/api/todos",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(responseAllTasks.data);
      setTasks(responseAllTasks.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTasks();
    console.log(tasks);
  }, []);
  return (
    <>
      <InputTask setTasks={setTasks} />
      <ToDoList tasks={tasks} setTasks={setTasks} />
      <FilterMain getAllTasks={getAllTasks} setTasks={setTasks} />
      <ActiveTasks tasks={tasks} setTasks={setTasks} />
    </>
  );
}
export default ToDoListMain;
