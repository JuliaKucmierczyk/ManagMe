import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Story } from "../Models/Story";
import { StoryService } from "../Services/StoryService";
import { SelectionService } from "../Services/SelectionService";

interface AddStoryProps {}

const AddStory: React.FC<AddStoryProps> = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Story["priority"]>("low");
  const history = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newStory: Story = {
      id: Math.floor(Math.random() * 100000) + 1,
      name,
      description,
      priority,
      projectId: SelectionService.getCurrentProjectId() || "",
      creationDate: new Date(),
      status: "todo",
      ownerId: "user-x",
    };

    try {
      await StoryService.createStory(newStory);
      history("/stories/" + SelectionService.getCurrentProjectId());
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  return (
    <div className="add-story-form">
      <h1>Add Story</h1>
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
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as Story["priority"])
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Add Story</button>
      </form>
    </div>
  );
};

export default AddStory;
