import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoryService } from "../Services/StoryService";
import { Task } from "../Models/Task";
import {
  FormInput,
  FormContainer,
  Form,
  FormBtn,
  Selector,
  TextArea,
} from "../Styles/StyledComponents";
import axios from "axios";

interface Props {}

const AddTask: React.FC<Props> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState<number>();
  const [priority, setPriority] = useState<Task["priority"]>("low");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:7000/add-task", {
        id: (Math.floor(Math.random() * 100000) + 1).toString(),
        name,
        description,
        priority,
        storyId: StoryService.getCurrentStoryId(),
        state: "todo",
        createdAt: new Date().toISOString(),
        estimatedTime,
        startDate: undefined,
        endDate: undefined,
        user: undefined,
      })
      .then((result) => {
        console.log(result);
        navigate("/tasks/" + StoryService.getCurrentStoryId());
      })
      .catch((err) => console.log(err));
  };

  return (
    <FormContainer>
      <h1>Add Task to a Story</h1>
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
          value={description}
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <FormInput
          type="number"
          id="estimatedTime"
          placeholder="Estimated Hours"
          value={estimatedTime}
          onChange={(event) => setEstimatedTime(parseInt(event.target.value))}
          required
        />
        <Selector
          id="priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as Task["priority"])
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Selector>
        <FormBtn type="submit">Add Task</FormBtn>
      </Form>
    </FormContainer>
  );
};

export default AddTask;
