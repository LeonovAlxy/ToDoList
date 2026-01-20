import axios from "axios";
import { useState } from "react";
const ActiveCounter = ({ tasks, setTasks }) => {
  const [loading, setLoading] = useState(false);
  const activeTasks = tasks.filter((item) => !item.isCompleted);
  const token = localStorage.getItem("token");
  const completedTasks = tasks.filter((item) => item.isCompleted);
  const deleteCompletedTasks = async () => {
    setLoading(true);
    try {
      completedTasks.forEach((task) => {
        axios.delete(`https://todo-redev.herokuapp.com/api/todos/${task.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
        <span class="loader"></span>
      )}
    </div>
  );
};
export default ActiveCounter;
