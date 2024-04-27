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
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [userId, setUser] = useState<string>();
  const [priority, setPriority] = useState<Task["priority"]>("low");

  // Sprawdz
  const history = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTask: Task = {
      id: (Math.floor(Math.random() * 100000) + 1).toString(),
      name,
      description,
      priority,
      storyId: StoryService.getCurrentStoryId() || "",
      state: "todo",
      createdAt: new Date().toString(),
      estimatedTime,
      startDate,
      endDate,
      userId,
    };

    try {
      await TaskService.createTask(newTask);
      // dsadasdasdasd
      history("/tasks/" + StoryService.getCurrentStoryId());
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="add-story-form add-story-form">
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
        <label htmlFor="startDate">Start date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />
        <label htmlFor="endDate">End date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          required
        />
        <label htmlFor="userId">User:</label>
        <select
          id="userId"
          value={userId}
          onChange={(event) => setUser(event.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
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
