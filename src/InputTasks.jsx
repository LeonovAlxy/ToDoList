import { useContext, useState } from "react";
import { TasksContext } from "./TasksContext";
const InputTask = () => {
  const { setTasks } = useContext(TasksContext);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    setError("");
  };
  const handleKeyDown = (e) => {
    if (text.trim() === "") {
      setError("Название не может быть пустым или состоять только из пробелов");
    } else if (e.key === "Enter") {
      setTasks((tasks) => [
        ...tasks,
        {
          id: crypto.randomUUID(),
          title: text,
          isDone: false,
        },
      ]);
      setError("");
      setText("");
    }
  };
  const handleClick = () => {
    if (text.trim() === "") {
      setError("Название не может быть пустым или состоять только из пробелов");
    } else {
      setTasks((tasks) => [
        ...tasks,
        {
          id: crypto.randomUUID(),
          title: text,
          isDone: false,
        },
      ]);
      setError("");
      setText("");
    }
  };

  return (
    <>
      {" "}
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
        <button onClick={handleClick}>Add Task</button>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};
export default InputTask;
