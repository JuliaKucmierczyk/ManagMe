import { useState } from "react";
import {
  FormInput,
  FormContainer,
  Form,
  FormBtn,
} from "../Styles/StyledComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post("http://localhost:7000/login", { username, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          navigate("/");
        } else {
          navigate("/register");
          alert("You are not registered to this service");
        }
      })
      .catch((err) => console.log(err));
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
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          maxLength={255}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormBtn>Login</FormBtn>
      </Form>
    </FormContainer>
  );
}

export default Login;
