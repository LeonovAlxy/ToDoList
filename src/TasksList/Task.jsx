import { useState } from "react";
import TaskEdit from "./TaskEdit";
import api from "../../api";

const Task = ({ task, setTasks }) => {
  const token = localStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/todos/${id}`);

      setTasks((tasks) => tasks.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
    } finally {
      setLoading(false);
    }
  };
  const switchIsDone = async (id) => {
    setLoading(true);
    try {
      await api.patch(`/todos/${id}/isCompleted`, {
        isCompleted: !task.isCompleted,
      });

      setTasks((tasks) =>
        tasks.map((item) =>
          item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
        ),
      );
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    } finally {
      setLoading(false);
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
        await api.patch(`/todos/${task.id}`, { title: newTitle });
        setTasks((tasks) =>
          tasks.map((item) =>
            item.id === task.id ? { ...item, title: newTitle } : item,
          ),
        );
      } catch (error) {
        console.error("Ошибка при обновлении названия:", error);
      } finally {
        setLoading(false);
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
