import Task from './Task';

import Sort from '../Sort/Sort';

import { useSelector } from 'react-redux';

const ToDoList = () => {
  const { tasks } = useSelector((store) => store.tasks);

  if (!tasks || tasks.length === 0) {
    return <div>Список задач пуст</div>;
  }

  return (
    <div className="ToDoList">
      <Sort />
      {tasks.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </div>
  );
};

export default ToDoList;
