import { useContext } from "react";
import { TasksContext } from "../TasksContext";

const Sort = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const hendleClick = () => {
    setTasks((tasks) => [...tasks].reverse());
    console.log(tasks);
  };
  return (
    <button className="Sort" onClick={() => hendleClick()}>
      &#9650; &#9660;
    </button>
  );
};
export default Sort;
