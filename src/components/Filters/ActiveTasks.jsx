import { useState } from "react";
import api from "../../../api";
const ActiveCounter = ({ tasks, setTasks }) => {
  const [loading, setLoading] = useState(false);
  const activeTasks = tasks.filter((item) => !item.isCompleted);
  const completedTasks = tasks.filter((item) => item.isCompleted);
  const deleteCompletedTasks = async () => {
    setLoading(true);
    try {
      completedTasks.forEach((task) => {
        api.delete(`/todos/${task.id}`);
      });
      setTasks(activeTasks);
      setLoading(false);
    } catch (error) {
      console.error("Ошибка удаления Complited tasks:", error);
    }
  };
  return (
    <div className="ActiveCounter">
      <p>Active: {activeTasks.length}</p>
      {!loading ? (
        <button onClick={() => deleteCompletedTasks()}>
          Remove fulfilled tasks
        </button>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};
export default ActiveCounter;
