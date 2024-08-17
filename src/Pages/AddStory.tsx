import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Story } from "../Models/Story";
// import { StoryService } from "../Services/StoryService";
import { SelectionService } from "../Services/SelectionService";
import {
  FormInput,
  FormContainer,
  Form,
  FormBtn,
  Selector,
  TextArea,
} from "../Styles/StyledComponents";
import axios from "axios";
import { UserService } from "../Services/UserService";

interface AddStoryProps {}

const AddStory: React.FC<AddStoryProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Story["priority"]>("low");
  const history = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post("http://localhost:7000/add-story", {
        id: Math.floor(Math.random() * 100000) + 1,
        name,
        description,
        priority,
        projectId: SelectionService.getCurrentProjectId(),
        creationDate: new Date(),
        status: "todo",
        userId: UserService.getLoggedInUser().id,
      })
      .then((result) => {
        console.log(result);
        history("/stories/" + SelectionService.getCurrentProjectId());
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormContainer>
      <h1>Add Story</h1>
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
        <Selector
          id="priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as Story["priority"])
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Selector>
        <FormBtn type="submit">Add Story</FormBtn>
      </Form>
    </FormContainer>
  );
};

export default AddStory;
