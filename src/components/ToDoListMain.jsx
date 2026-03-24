import { useEffect } from "react";
import InputTask from "../components/InputTasks";
import ToDoList from "./TasksList/TodoList";
import FilterMain from "./Filters/FilterMain";
import ActiveTasks from "./Filters/ActiveTasks";
import { useDispatch, useSelector } from "react-redux";

import { getTasks } from "../store/slices/tasksSlice";

function ToDoListMain() {
  const { loading } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, []);
  return (
    <>
      <InputTask />
      {loading ? <span className="loader"></span> : <ToDoList />}

      <FilterMain />
      <ActiveTasks />
    </>
  );
}
export default ToDoListMain;
