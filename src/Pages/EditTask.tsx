import { useNavigate, useParams } from "react-router-dom";
import { TaskService } from "../Services/TaskService";
import { Task } from "../Models/Task";
import React, { useEffect, useState } from "react";
import { StoryService } from "../Services/StoryService";
import { UserService } from "../Services/UserService";
import { User } from "../Models/User";
import {
  FormInput,
  FormContainer,
  Form,
  FormBtn,
  TextArea,
  Selector,
} from "../Styles/StyledComponents";

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
    <FormContainer>
      <h2>Edit Task</h2>
      <Form onSubmit={handleEditTask}>
        <FormInput
          type="text"
          id="name"
          placeholder="Name"
          defaultValue={task.name}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextArea
          id="description"
          placeholder="Description"
          defaultValue={task.description}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Selector
          id="user"
          value={user?.id}
          onChange={(event) => setUser(event.target.value as unknown as User)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} ({user.role})
            </option>
          ))}
        </Selector>
        <div>
          <FormBtn type="submit">Save</FormBtn>
          <FormBtn onClick={handleCancel}>Cancel</FormBtn>
          <FormBtn onClick={handleDoneClick}>Done</FormBtn>
        </div>
      </Form>
    </FormContainer>
  );
};

export default EditTask;
