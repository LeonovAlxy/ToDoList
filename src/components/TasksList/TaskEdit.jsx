import { useState, useRef, useEffect } from "react";
import { addErrors } from "../../store/slices/tasksSlice";
import { useSelector, useDispatch } from "react-redux";

const TaskEdit = ({ initialTitle, onSave, onCancel }) => {
  const [editTitle, setEditTitle] = useState(initialTitle);
  const { errors } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setEditTitle(e.target.value);
    dispatch(addErrors(""));
  };

  const handleKeyDown = (e) => {
    if (editTitle.trim() === "") {
      dispatch(addErrors("Не может быть пустым"));
    } else if (e.key === "Enter") {
      onSave(editTitle.trim());
      dispatch(addErrors(""));
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleBlur = () => {
    onSave(editTitle.trim());
  };

  return (
    <>
      <input
        className="TaskEdit"
        ref={inputRef}
        type="text"
        value={editTitle}
        placeholder={errors ? errors : ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        style={{
          borderColor: errors ? "red" : undefined,
          color: errors ? "red" : "inherit",
        }}
      />
    </>
  );
};

export default TaskEdit;
