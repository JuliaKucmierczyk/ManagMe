import { useNavigate, useParams } from "react-router-dom";
import { TaskService } from "../Services/TaskService";
import { Task } from "../Models/Task";
import React, { useEffect, useState } from "react";
import { StoryService } from "../Services/StoryService";
import { UserService } from "../Services/UserService";
import { User } from "../Models/User";

const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState<User>();
  const [users, setUsers] = useState<User[]>([]);
  const [task, setTask] = useState<Task | null>(null);

  const currentStory = StoryService.getCurrentStoryId();

  useEffect(() => {
    console.log(taskId);
    if (taskId) {
      const fetchedTask = TaskService.getTaskById(taskId);
      console.log("Fetched task: " + fetchedTask);
      setTask(fetchedTask);
    }
    const users = UserService.getAllDevs();
    setUsers(users);
  }, [taskId]);

  const handleEditTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task) {
      const updatedTask = {
        ...task,
        name,
        description,
        startDate: user ? new Date().toISOString() : undefined,
        state: user ? "doing" : task.state,
      };
      TaskService.updateTask(task.id, updatedTask);
      navigate(`/tasks/${currentStory}`);
    }
  };

  const handleCancel = () => {
    navigate(`/tasks/${currentStory}`);
  };

  const handleDoneClick = () => {
    if (task) {
      const updatedTask = {
        ...task,
        endDate: new Date().toISOString(),
        state: "done",
      } as Task;
      TaskService.updateTask(task.id, updatedTask);
      navigate(`/tasks/${currentStory}`);
    }
  };

  if (!task) {
    console.log(task);
    return <div>Loading task details...</div>;
  }

  return (
    <div className="add-story-form container">
      <h2>Edit Task</h2>
      <form onSubmit={handleEditTask}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          defaultValue={task.name}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          defaultValue={task.description}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label htmlFor="user">User:</label>
        <select
          id="user"
          value={user?.id}
          onChange={(event) => setUser(event.target.value as unknown as User)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} ({user.role})
            </option>
          ))}
        </select>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" onClick={handleDoneClick}>
          Done
        </button>
      </form>
    </div>
  );
};

export default EditTask;
