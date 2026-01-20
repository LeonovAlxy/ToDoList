import { useState } from "react";
import axios from "axios";

const InputTask = ({ setTasks }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const handleChange = (e) => {
    setText(e.target.value);
    setError("");
  };

  const handleAddTask = async () => {
    if (text.trim() === "") {
      setError("Название не может быть пустым или состоять только из пробелов");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "https://todo-redev.herokuapp.com/api/todos",
        { title: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const newTask = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setText("");
      setError("");
      setLoading(false);
    } catch (error) {
      setError("Ошибка при добавлении задачи");
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleClick = () => {
    handleAddTask();
  };

  return (
    <>
      <div className="InputTask">
        <input
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Create task"
          style={{
            borderColor: error ? "red" : undefined,
          }}
        />
        {!loading ? (
          <button onClick={handleClick}>Add Task</button>
        ) : (
          <span class="loader"></span>
        )}
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};

export default InputTask;
