import { useState } from 'react';

import TaskEdit from './TaskEdit';

import { useSelector, useDispatch } from 'react-redux';

import { deleteTask, switchIsDone, updateTaskName } from '../../store/slices/tasksSlice';

const Task = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { loading } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async (newTitle) => {
    if (newTitle !== '') {
      dispatch(updateTaskName({ id: task.id, newTitle }));
    }
    setIsEditing(false);
  };
  const handleChange = () => {
    dispatch(switchIsDone(task.id));
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="Task">
      {!loading ? (
        <>
          <input type="checkbox" checked={task.isCompleted} onChange={handleChange} />
          {isEditing ? (
            <TaskEdit
              initialTitle={task.title}
              onSave={handleSaveEdit}
              onCancel={handleCancelEdit}
            />
          ) : (
            <>
              <p className={task.isCompleted ? 'active' : ''}>{task.title}</p>
              <button onClick={handleStartEdit}>change</button>
            </>
          )}
          <button onClick={() => dispatch(deleteTask(task.id))}>delete</button>
        </>
      ) : (
        <span className="loader"></span>
      )}
    </div>
  );
};

export default Task;
