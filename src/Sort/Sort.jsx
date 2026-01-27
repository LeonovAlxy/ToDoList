const Sort = ({ tasks, setTasks }) => {
  const handleClick = () => {
    setTasks((tasks) => [...tasks].reverse());
    console.log(tasks);
  };
  return (
    <button className="Sort" onClick={() => handleClick()}>
      &#9650; &#9660;
    </button>
  );
};
export default Sort;
