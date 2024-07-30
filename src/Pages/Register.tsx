import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormInput,
  FormContainer,
  Form,
  FormBtn,
} from "../Styles/StyledComponents";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser() {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      navigate("/login", { replace: true });
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={registerUser} className="form">
        <FormInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <FormInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <FormBtn>Register</FormBtn>
      </Form>
    </FormContainer>
  );
}

export default Register;
