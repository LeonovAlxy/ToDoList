import Task from "./Task";
import Sort from "../Sort/Sort";

const ToDoList = ({ filter, tasks, setTasks }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.isDone;
    if (filter === "done") return task.isDone;
    return true;
  });
  return (
    <div className="ToDoList">
      <Sort tasks={tasks} setTasks={setTasks} />
      {filteredTasks.map((item) => (
        <Task key={item.id} task={item} setTasks={setTasks} />
      ))}
    </div>
  );
};
export default ToDoList;
