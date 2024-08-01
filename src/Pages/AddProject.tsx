import {
  FormContainer,
  FormInput,
  Form,
  TextArea,
  FormBtn,
} from "../Styles/StyledComponents";
import { Project } from "../Models/Project";
import { ProjectService } from "../Services/ProjectService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProject: Project = {
      id: (Math.floor(Math.random() * 100000) + 1).toString(),
      name,
      description,
    };

    try {
      await ProjectService.createProject(newProject);
      navigate("/");
    } catch (error) {
      console.error("Error creating project:", error);
    }
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
