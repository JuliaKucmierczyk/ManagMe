import { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  width: fit-content;
  min-width: 30rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const FormBtn = styled.button`
  background-color: dodgerblue;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-bottom: 15px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  width: 6rem;

  &:hover {
    background-color: rgb(11, 82, 152);
  }
`;
export const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

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
