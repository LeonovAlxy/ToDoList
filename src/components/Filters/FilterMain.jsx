import { useState } from "react";
import api from "../../../api";
const Filter = ({ setTasks, getAllTasks }) => {
  const [loading, setLoading] = useState(false);

  const getDoneTasks = async () => {
    setLoading(true);
    try {
      const responseAllTasks = await api.get("/todos?isCompleted=true");
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
      const responseAllTasks = await api.get("/todos?isCompleted=false");
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
        <span className="loader"></span>
      )}
    </div>
  );
};
export default Filter;
