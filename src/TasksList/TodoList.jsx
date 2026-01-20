import Task from "./Task";
import Sort from "../Sort/Sort";

const ToDoList = ({ tasks, setTasks }) => {
  return (
    <div className="ToDoList">
      <Sort tasks={tasks} setTasks={setTasks} />
      {tasks.map((item) => (
        <Task key={item.id} task={item} setTasks={setTasks} />
      ))}
    </div>
  );
};
export default ToDoList;
