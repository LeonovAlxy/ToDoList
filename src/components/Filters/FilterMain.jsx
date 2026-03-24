import { useSelector, useDispatch } from "react-redux";
import {
  getTasks,
  getDoneTasks,
  getActiveTasks,
} from "../../store/slices/tasksSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.tasks);

  return (
    <div className="FilterMain">
      {!loading ? (
        <>
          <button onClick={() => dispatch(getTasks())}>All</button>
          <button onClick={() => dispatch(getActiveTasks())}>Active</button>
          <button onClick={() => dispatch(getDoneTasks())}>Done</button>
        </>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};
export default Filter;
