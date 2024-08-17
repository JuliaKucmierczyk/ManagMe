import {
  FormContainer,
  FormInput,
  Form,
  TextArea,
  FormBtn,
} from "../Styles/StyledComponents";
// import { Project } from "../Models/Project";
// import { ProjectService } from "../Services/ProjectService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserService } from "../Services/UserService";

const AddProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const currentId = UserService.getLoggedInUser();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    axios
      .post("http://localhost:7000/add-project", {
        id: (Math.floor(Math.random() * 100000) + 1).toString(),
        name,
        description,
        userId: currentId.id,
      })
      .then((result) => {
        console.log(result);
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormContainer>
      <h1>Add Project</h1>
      <Form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <TextArea
          id="description"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <FormBtn type="submit">Add Project</FormBtn>
      </Form>
    </FormContainer>
  );
};

export default AddProject;
