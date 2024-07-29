import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoryService } from "../Services/StoryService";
import { Task } from "../Models/Task";
import { TaskService } from "../Services/TaskService";
import { Form, FormBtn, FormContainer, FormInput } from "./Login";
import { Selector, TextArea } from "./EditTask";

interface Props {}

const AddTask: React.FC<Props> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState<number>();
  const [priority, setPriority] = useState<Task["priority"]>("low");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTask: Task = {
      id: (Math.floor(Math.random() * 100000) + 1).toString(),
      name,
      description,
      priority,
      storyId: StoryService.getCurrentStoryId() || "",
      state: "todo",
      createdAt: new Date().toUTCString(),
      estimatedTime,
      startDate: undefined,
      endDate: undefined,
      user: undefined,
    };

    try {
      await TaskService.createTask(newTask);
      navigate("/tasks/" + StoryService.getCurrentStoryId());
    } catch (error) {
      console.error("Error creating task:", error);
    }
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
