import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
const Login = ({ setToken }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const loginResponse = await axios.post(
        import.meta.env.VITE_API_URL_LOGIN,
        data,
      );
      if (loginResponse.status === 200) {
        setToken(loginResponse.data.token);
        localStorage.setItem("token", loginResponse.data.token);
        alert("Успешно вошли в систему");
        reset();
        navigate("/");
        console.log(loginResponse.data.token);
      }
    } catch (loginError) {
      alert(
        "Логин не удался: " +
          (loginError.response?.data?.message || loginError.message),
      );
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="AuthForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          email:
          <input
            type="email"
            placeholder="example@gmail.com"
            {...register("email", {
              required: "Обязательно к заполнению",
            })}
          />
        </label>
        <div className="FormError">
          {errors?.email && <p>{errors?.email?.message}</p>}
        </div>

        <label>
          password:
          <input
            type="password"
            placeholder="password"
            {...register("password", {
              required: "Обязательно к заполнению",
              minLength: {
                value: 8,
                message: "Минимальная длина 8 символов",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[$${}|\\:;"'<>,.?/-]).{8,}$/,
                message:
                  "Должен содержать минимум 8 символов, одну заглавную букву, маленькую, цифру и спецсимвол",
              },
            })}
          />
        </label>
        <div className="FormError">
          {errors?.password && <p>{errors?.password?.message}</p>}
        </div>
        {loading && <span className="loader"></span>}
        <input type="submit" disabled={!isValid} value={"Login"} />
      </form>
    </div>
  );
};
export default Login;
