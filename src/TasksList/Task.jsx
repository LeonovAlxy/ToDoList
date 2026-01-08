import { useContext } from "react";
import { TasksContext } from "../TasksContext";
import { useState } from "react";
import TaskEdit from "./TaskEdit";

const Task = ({ task }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteClick = (id) => {
    setTasks((tasks) => tasks.filter((item) => item.id !== id));
  };

  const switchIsDone = (id) => {
    setTasks((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = (newTitle) => {
    if (newTitle !== "") {
      setTasks((tasks) =>
        tasks.map((item) =>
          item.id === task.id ? { ...item, title: newTitle } : item
        )
      );
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="Task">
      <input
        type="checkbox"
        checked={task.isDone}
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
          <p className={task.isDone ? "active" : ""}>{task.title}</p>
          <button onClick={handleStartEdit}>change</button>
        </>
      )}
      <button onClick={() => handleDeleteClick(task.id)}>delete</button>
    </div>
  );
};
export default Task;
