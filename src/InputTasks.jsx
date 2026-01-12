import { useContext, useState } from "react";
import { TasksContext } from "./TasksContext";
const InputTask = () => {
  const { setTasks } = useContext(TasksContext);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
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
          placeholder="Create task"
          style={{
            borderColor: error ? "red" : undefined,
          }}
        ></input>
        <button onClick={handleClick}>Add Task</button>
      </div>
      {error && <div className="error">{error}</div>}
    </>
  );
};
export default InputTask;
