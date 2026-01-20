import { useState } from "react";
import TaskEdit from "./TaskEdit";
import axios from "axios";

const Task = ({ task, setTasks }) => {
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`https://todo-redev.herokuapp.com/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((tasks) => tasks.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
    }
  };
  const switchIsDone = async (id) => {
    setLoading(true);
    try {
      await axios.patch(
        `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
        { isCompleted: !task.isCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTasks((tasks) =>
        tasks.map((item) =>
          item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
        ),
      );
      setLoading(false);
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async (newTitle) => {
    if (newTitle !== "") {
      setLoading(true);
      try {
        console.log("id:", task.id);
        await axios.patch(
          `https://todo-redev.herokuapp.com/api/todos/${task.id}`,
          { title: newTitle },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setTasks((tasks) =>
          tasks.map((item) =>
            item.id === task.id ? { ...item, title: newTitle } : item,
          ),
        );
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при обновлении названия:", error);
      }
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="Task">
      {!loading ? (
        <>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => switchIsDone(task.id)}
          />
          {isEditing ? (
            <TaskEdit
              initialTitle={task.title}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ) : (
            <>
              <p className={task.isCompleted ? "active" : ""}>{task.title}</p>
              <button onClick={handleStartEdit}>change</button>
            </>
          )}
          <button onClick={() => handleDeleteClick(task.id)}>delete</button>
        </>
      ) : (
        <span class="loader"></span>
      )}
    </div>
  );
};
export default Task;
