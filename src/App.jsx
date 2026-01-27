import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDoListMain from "./ToDoListMain";
import Header from "./Header/Header";
import { useState } from "react";
import "./App.css";
import PrivateRoute from "./Routes/PrivateRoute";
import RegForm from "./Form/RegForm";

function App() {
  const [token, setToken] = useState("");
  return (
    <Router basename="/ToDoList/">
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<ToDoListMain token={token} />} />
        </Route>
        <Route
          path="/register"
          element={<RegForm token={token} setToken={setToken} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
