const Sort = ({ tasks, setTasks }) => {
  const hendleClick = () => {
    setTasks((tasks) => [...tasks].reverse());
    console.log(tasks);
  };
  return (
    <button className="Sort" onClick={() => hendleClick()}>
      &#9650; &#9660;
    </button>
  );
};
export default Sort;
