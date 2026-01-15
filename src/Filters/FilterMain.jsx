const Filter = ({ setFilter }) => {
  return (
    <div className="FilterMain">
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("done")}>Done</button>
    </div>
  );
};
export default Filter;
