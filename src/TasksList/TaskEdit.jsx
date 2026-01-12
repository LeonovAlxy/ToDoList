import { useState, useRef, useEffect } from "react";

const TaskEdit = ({ initialTitle, onSave, onCancel }) => {
  const [editTitle, setEditTitle] = useState(initialTitle);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (editTitle.trim() === "") {
      setError("Не может быть пустым");
    } else if (e.key === "Enter") {
      onSave(editTitle.trim());
      setError("");
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
        value={error ? error : editTitle}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        style={{
          borderColor: error ? "red" : undefined,
          color: error ? "red" : "inherit",
        }}
      />
    </>
  );
};

export default TaskEdit;
