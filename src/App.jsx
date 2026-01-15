import "./App.css";
import Header from "./Header/Header";
import InputTask from "./InputTasks";
import { TasksProvider } from "./TasksContext";
import ToDoList from "./TasksList/TodoList";
import FilterMain from "./Filters/FilterMain";
import ActiveTasks from "./Filters/ActiveTasks";

function App() {
  return (
    <TasksProvider>
      <Header />
      <InputTask />
      <ToDoList />
      <FilterMain />
      <ActiveTasks />
    </TasksProvider>
  );
}
// src/
// ├── App.js
// ├── Header/
// │   └── Header.js
// ├── InputTasks/
// │   └── InputTask.js
// ├── TasksList/
// │   ├── ToDoList.js
// │   └── Task.js
// │   └── TaskEdit.js
// ├── Filters/
// │   ├── Filter.js
// │   └── ActiveCounter.js
// ├── Sort/
//   └── Sort.js

export default App;
