import { deleteCompletedTasks } from "../../store/slices/tasksSlice";

import { useSelector, useDispatch } from "react-redux";

const ActiveCounter = () => {
  const { loading, tasks } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  const activeTasks = tasks.filter((item) => !item.isCompleted);
  const completedTasks = tasks.filter((item) => item.isCompleted);

  const handleDeleteCompleted = () => {
    if (completedTasks.length > 0) {
      dispatch(deleteCompletedTasks());
    }
  };

  return (
    <div className="ActiveCounter">
      <p>Active: {activeTasks.length}</p>
      {!loading ? (
        <button onClick={handleDeleteCompleted}>Remove fulfilled tasks</button>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};
export default ActiveCounter;
