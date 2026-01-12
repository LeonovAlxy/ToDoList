import { useContext } from "react";
import { TasksContext } from "../TasksContext";
import Task from "./Task";
import Sort from "../Sort/Sort";

const ToDoList = () => {
  const { tasks, filter } = useContext(TasksContext);
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.isDone;
    if (filter === "done") return task.isDone;
    return true;
  });
  return (
    <div className="ToDoList">
      <Sort />
      {filteredTasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};
export default ToDoList;
