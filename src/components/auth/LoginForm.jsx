import { useNavigate } from "react-router-dom";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
    setAuth({ user: data });
    navigate("/");
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

      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
