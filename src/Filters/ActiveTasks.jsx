import { useContext } from "react";
import { TasksContext } from "../TasksContext";

const ActiveCounter = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const activeTasks = tasks.filter((item) => !item.isDone);
  return (
    <div className="ActiveCounter">
      <p>Active: {activeTasks.length}</p>
      <button onClick={() => setTasks(activeTasks)}>
        Remove fulfilled tasks
      </button>
    </div>
  );
};
export default ActiveCounter;
