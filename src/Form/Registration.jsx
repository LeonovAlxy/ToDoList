import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";

const Registration = ({ setToken }) => {
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
      const regResponse = await axios.post(
        import.meta.env.VITE_API_URL_REGISTER,
        { ...data, age: Number(data.age) },
      );

      if (regResponse.status === 200) {
        let loginResponse;
        try {
          loginResponse = await axios.post(import.meta.env.VITE_API_URL_LOGIN, {
            email: data.email,
            password: data.password,
          });
        } catch (loginError) {
          alert(
            "Логин не удался: " +
              (loginError.response?.data?.message || loginError.message),
          );
          return;
        } finally {
          setLoading(false);
        }

        if (loginResponse.status === 200) {
          setToken(loginResponse.data.token);
          localStorage.setItem("token", loginResponse.data.token);
          setLoading(false);
          alert("Успешно вошли в систему");
          reset();
          navigate("/");
          console.log(loginResponse.data.token);
        }
      }
    } catch (error) {
      console.error("Ответ сервера:", error.response?.data);
      alert("Ошибка: " + (error.response?.data?.message || error.message));
    }
  };
  return (
    <>
      <div className="AuthForm">
        <h2>Registration</h2>{" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            {" "}
            username:{" "}
            <input
              type="text"
              placeholder="Ivanov Ivan"
              {...register("username", {
                required: "Обязательно к заполнению",
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
              })}
            />
          </label>
          <div className="FormError">
            {errors?.username && <p>{errors?.username?.message}</p>}
          </div>

          <label>
            {" "}
            email:{" "}
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
            {" "}
            password:{" "}
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

          <label>
            {" "}
            gender:{" "}
            <select {...register("gender", { required: "Обязательное поле" })}>
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </label>
          <div className="FormError">
            {errors?.gender && <p>{errors?.gender?.message}</p>}
          </div>

          <label>
            {" "}
            age:{" "}
            <input
              type="number"
              placeholder="18"
              {...register("age", {
                required: "Обязательно к заполнению",
              })}
            />
          </label>
          <div className="FormError">
            {errors?.age && <p>{errors?.age?.message}</p>}
          </div>
          {loading && <span className="loader"></span>}
          <input type="submit" disabled={!isValid} value={"Register"} />
        </form>
      </div>
    </>
  );
};
export default Registration;
