import React from "react";
import Field from "../common/Field";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post("/auth/register", formData);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.response?.data?.error ?? ""}`,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(handleRegister)}
    >
      <Field label="First Name" htmlFor="firstName" error={errors.firstName}>
        <input
          className={`auth-input ${errors.name && "border-red-500"}`}
          {...register("firstName", {
            required: "First Name is required!",
          })}
          name="firstName"
          type="text"
          id="firstName"
        />
      </Field>

      <Field label="Last Name" htmlFor="lastName" error={errors.lastName}>
        <input
          className={`auth-input ${errors.name && "border-red-500"}`}
          {...register("lastName", {
            required: "Last Name is required!",
          })}
          name="lastName"
          type="text"
          id="lastName"
        />
      </Field>

      <Field label="Email" htmlFor="email" error={errors.email}>
        <input
          className={`auth-input ${errors.email && "border-red-500"}`}
          {...register("email", {
            required: "Email is required!",
          })}
          type="email"
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
          type="password"
          name="password"
          id="password"
        />
      </Field>

      <p className="mb-2 text-red-500">{errors?.root?.random?.message}</p>

      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
