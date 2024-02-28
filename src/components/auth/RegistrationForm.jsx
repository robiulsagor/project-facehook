import React from "react";
import Field from "../common/Field";
import { useForm } from "react-hook-form";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = (data) => {
    console.log(data);
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(handleRegister)}
    >
      <Field label="Name" htmlFor="name" error={errors.name}>
        <input
          className={`auth-input ${errors.name && "border-red-500"}`}
          {...register("name", {
            required: "Name is required!",
          })}
          name="name"
          type="text"
          id="name"
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

      <Field
        label="Confirm Password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword}
      >
        <input
          className={`auth-input ${errors.confirmPassword && "border-red-500"}`}
          {...register("confirmPassword", {
            required: "Confirm Password is required!",
          })}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />
      </Field>

      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
