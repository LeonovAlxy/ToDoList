import { useDispatch, useSelector } from "react-redux";
import { addInputTask } from "../store/slices/tasksSlice";
import { addInputText, addErrors } from "../store/slices/tasksSlice";

const InputTask = () => {
  const { errors, loading, inputText } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(addInputText(e.target.value));
  };

  const handleAddTask = async () => {
    if (inputText.trim() === "") {
      dispatch(
        addErrors(
          "Название не может быть пустым или состоять только из пробелов",
        ),
      );
      return;
    }
    dispatch(addInputTask(inputText));
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
          value={inputText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Create task"
          style={{
            borderColor: errors ? "red" : undefined,
          }}
        />
        {!loading ? (
          <button onClick={handleClick}>Add Task</button>
        ) : (
          <span className="loader"></span>
        )}
      </div>
      {errors && <div className="error">{errors}</div>}
    </>
  );
};

export default InputTask;
