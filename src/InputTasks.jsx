import { useContext, useState } from "react";
import { TasksContext } from "./TasksContext";
const InputTask = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleClick = () => {
    setTasks((tasks) => [
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: text,
        isDone: false,
      },
    ]);
    setText("");
  };

  return (
    <div className="InputTask">
      <input
        value={text}
        onChange={handleChange}
        placeholder="Create task"
      ></input>
      <button onClick={handleClick}>Add Task</button>
    </div>
  );
};
export default InputTask;
