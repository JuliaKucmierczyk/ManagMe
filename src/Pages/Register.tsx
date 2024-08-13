import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormInput,
  FormContainer,
  Form,
  FormBtn,
} from "../Styles/StyledComponents";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post("http://localhost:7000/register", {
        id: (Math.floor(Math.random() * 100000) + 1).toString(),
        username,
        password,
        firstName,
        lastName,
      })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit} className="form">
        <FormInput
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
          type="text"
          placeholder="First name"
        />
        <FormInput
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          type="text"
          placeholder="Last name"
        />
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
