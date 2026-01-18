import ToDoListMain from "./ToDoListMain";
import Header from "./Header/Header";
import { useState } from "react";
import "./App.css";
import RegForm from "./Form/RegForm";

function App() {
  const [token, setToken] = useState("token");
  return (
    <>
      <Header />
      <RegForm token={token} setToken={setToken} />
      {token && <ToDoListMain />}
    </>
  );
}

export default App;
