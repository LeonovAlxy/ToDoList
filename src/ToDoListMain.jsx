import { useState, useEffect } from "react";
import InputTask from "./InputTasks";
import ToDoList from "./TasksList/TodoList";
import FilterMain from "./Filters/FilterMain";
import ActiveTasks from "./Filters/ActiveTasks";
import api from "../api";

function ToDoListMain() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllTasks = async () => {
    try {
      const responseAllTasks = await api.get("/todos");
      console.log(responseAllTasks.data);
      setTasks(responseAllTasks.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTasks();
    console.log(tasks);
  }, []);
  return (
    <>
      <InputTask setTasks={setTasks} />
      {loading ? (
        <span className="loader"></span>
      ) : (
        <ToDoList tasks={tasks} setTasks={setTasks} />
      )}

      <FilterMain getAllTasks={getAllTasks} setTasks={setTasks} />
      <ActiveTasks tasks={tasks} setTasks={setTasks} />
    </>
  );
}
export default ToDoListMain;
