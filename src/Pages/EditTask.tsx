import { useNavigate, useParams } from "react-router-dom";
import { TaskService } from "../Services/TaskService";
import { Task } from "../Models/Task";
import React, { useEffect, useState } from "react";
import { StoryService } from "../Services/StoryService";

const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [task, setTask] = useState<Task | null>(null);
  const currentStory = StoryService.getCurrentStoryId();

  useEffect(() => {
    console.log(taskId);
    if (taskId) {
      const fetchedTask = TaskService.getTaskById(taskId);
      console.log("Fetched task: " + fetchedTask);
      setTask(fetchedTask);
    }
  }, [taskId]);

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update task data using TaskService
    if (task) {
      const updatedTask = {
        ...task,
        name,
        description,
      };
      TaskService.updateTask(task.id, updatedTask);
      navigate(`/tasks/${currentStory}`);
    }
  };

  const handleCancel = () => {
    navigate(`/tasks/${currentStory}`);
  };

  if (!task) {
    console.log(task);
    return <div>Loading task details...</div>;
  }

  return (
    <div className="edit-task-container add-story-form">
      <h2>Edit Task</h2>
      <form onSubmit={handleEditTask}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          defaultValue={task.name}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          defaultValue={task.description}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTask;
