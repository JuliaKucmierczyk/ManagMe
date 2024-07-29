import { useState, ChangeEvent, FormEvent } from "react";
import {
  FormInput,
  FormContainer,
  Form,
  FormBtn,
} from "../Styles/StyledComponents";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5184/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Token:", data.token);
      console.log("Refresh Token:", data.refreshToken);
    } else {
      console.error("Login failed. Response status:", response.status);
    }
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form id="loginform1" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="login"
          placeholder="Username"
          maxLength={255}
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          maxLength={255}
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <FormBtn>Login</FormBtn>
      </Form>
    </FormContainer>
  );
}

export default Login;
