import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoryService } from "../Services/StoryService";
import { Task } from "../Models/Task";
import { TaskService } from "../Services/TaskService";

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
    <div className="add-story-form ">
      <h1>Add Task to a Story</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
        <label htmlFor="estimatedTime">Estimated hours:</label>
        <input
          type="number"
          id="estimatedTime"
          value={estimatedTime}
          onChange={(event) => setEstimatedTime(parseInt(event.target.value))}
          required
        />
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as Task["priority"])
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
