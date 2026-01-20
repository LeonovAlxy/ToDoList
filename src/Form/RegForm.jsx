import { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";

const RegForm = ({ token, setToken }) => {
  const [RegComp, setRegComp] = useState();
  return (
    <div className="Initial">
      {!RegComp && (
        <div className="AuthFormButtons">
          <button
            onClick={() =>
              setRegComp(<Registration token={token} setToken={setToken} />)
            }
          >
            Registration
          </button>
          <button
            onClick={() =>
              setRegComp(<Login token={token} setToken={setToken} />)
            }
          >
            Login
          </button>
        </div>
      )}
      {RegComp}
    </div>
  );
};
export default RegForm;
