import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await await axios.post("/api/login", data);

      const { token, refreshToken, error } = response.data;

      if (error) {
        setLoginError(error);
        return;
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/protected-route");
    } catch (error) {
      console.error(error);
      setLoginError("Wystąpił błąd podczas logowania.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <label htmlFor="username">Nazwa użytkownika:</label>
      <input
        id="username"
        name="username"
        type="text"
        ref={register("username").ref}
      />
      {errors.username && <p className="error">{errors.username.message}</p>}

      <label htmlFor="password">Hasło:</label>
      <input
        id="password"
        name="password"
        type="password"
        ref={register("password").ref}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit">Zaloguj się</button>

      {loginError && <p className="error">{loginError}</p>}
    </form>
  );
};

export default LoginForm;
