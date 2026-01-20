import axios from "axios";
import { useState } from "react";
const Filter = ({ setTasks, getAllTasks }) => {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const getDoneTasks = async () => {
    setLoading(true);
    try {
      const responseAllTasks = await axios.get(
        "https://todo-redev.herokuapp.com/api/todos?isCompleted=true",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(responseAllTasks.data);
      setLoading(false);
      setTasks(responseAllTasks.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getActiveTasks = async () => {
    setLoading(true);
    try {
      const responseAllTasks = await axios.get(
        "https://todo-redev.herokuapp.com/api/todos?isCompleted=false",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log(responseAllTasks.data);
      setLoading(false);
      setTasks(responseAllTasks.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="FilterMain">
      {!loading ? (
        <>
          <button onClick={() => getAllTasks()}>All</button>
          <button onClick={() => getActiveTasks()}>Active</button>
          <button onClick={() => getDoneTasks()}>Done</button>
        </>
      ) : (
        <span class="loader"></span>
      )}
    </div>
  );
};
export default Filter;
