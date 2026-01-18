import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
const Registration = ({ token, setToken }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState({});
  return <div>Registration {token}</div>;
};
export default Registration;
