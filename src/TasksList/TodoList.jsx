import { useContext } from "react";
import { TasksContext } from "../TasksContext";
import Task from "./Task";

const ToDoList = () => {
  const { tasks } = useContext(TasksContext);
  return (
    <div className="ToDoList">
      {tasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};
export default ToDoList;
