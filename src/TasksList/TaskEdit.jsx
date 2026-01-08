import { useState, useRef, useEffect } from "react";

const TaskEdit = ({ initialTitle, onSave, onCancel }) => {
  const [editTitle, setEditTitle] = useState(initialTitle);
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
    if (e.key === "Enter") {
      onSave(editTitle.trim());
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const handleBlur = () => {
    onSave(editTitle.trim());
  };

  return (
    <input
      className="TaskEdit"
      ref={inputRef}
      type="text"
      value={editTitle}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  );
};

export default TaskEdit;
