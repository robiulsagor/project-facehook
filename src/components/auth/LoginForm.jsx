import { useNavigate } from "react-router-dom";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

export default function LoginForm() {
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("/auth/login", data);

      if (response.status == 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token?.token;
          const refreshToken = token?.refreshToken;

          setAuth({ user, authToken, refreshToken });
          console.log({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      console.log(error?.response?.status);
      if (error?.response?.status == 500) {
        setError("root.random", {
          type: "random",
          message: error?.response?.statusText,
        });
      } else {
        setError("root.random", {
          type: "random",
          message: error?.response?.data.error,
        });
      }
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(handleLogin)}
    >
      <Field label="Email" htmlFor="email" error={errors.email}>
        <input
          className={`auth-input ${errors.email && "border-red-500"}`}
          {...register("email", {
            required: "Email is required!",
          })}
          type="text"
          name="email"
          id="email"
        />
      </Field>

      <Field label="Password" htmlFor="password" error={errors.password}>
        <input
          className={`auth-input ${errors.password && "border-red-500"}`}
          {...register("password", {
            required: "Password is required!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="text"
          name="password"
          id="password"
        />
      </Field>

      <p className="mb-1 text-red-500">{errors?.root?.random?.message}</p>

      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90 disabled:opacity-50 "
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
