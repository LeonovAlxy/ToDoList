import { reverse } from '../../store/slices/tasksSlice';

import { useDispatch } from 'react-redux';

const Sort = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(reverse());
  };

  return (
    <button className="Sort" onClick={() => handleClick()}>
      &#9650; &#9660;
    </button>
  );
};

export default Sort;
