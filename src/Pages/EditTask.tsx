import { useNavigate, useParams } from "react-router-dom";
import { Task } from "../Models/Task";
import { useEffect, useState } from "react";
import { StoryService } from "../Services/StoryService";
import {
  FormInput,
  FormContainer,
  Form,
  FormBtn,
  TextArea,
  Selector,
  DeleteBtn,
} from "../Styles/StyledComponents";
import axios from "axios";
import { UserService } from "../Services/UserService";

const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [task, setTask] = useState<Task | null>(null);

  const users = UserService.getAllDevs();
  const currentStory = StoryService.getCurrentStoryId();
  // const loggedUser = UserService.getLoggedInUser();

  // pobiera taska do edycji
  useEffect(() => {
    const fetchTask = async () => {
      await axios
        .get(`http://localhost:7000/edit-task/${taskId}`)
        .then((response) => {
          console.log(response);
          setTask(response.data);
          setName(response.data.name);
          setDescription(response.data.description);
          setSelectedUserId(response.data.user);
        })
        .catch((err) => console.log(err));
    };
    fetchTask();
  }, [taskId]);

  //updajtuje taska
  const handleEditTask = () => {
    axios
      .post(`http://localhost:7000/edit-task/${taskId}`, {
        name,
        description,
        userId: selectedUserId,
        startDate: new Date().toISOString(),
        state: "doing",
      })
      .then((result) => {
        console.log(result);
        navigate(`/tasks/${currentStory}`);
      })
      .catch((err) => console.log(err));

    navigate(`/tasks/${currentStory}`);
  };

  const handleCancel = () => {
    navigate(`/tasks/${currentStory}`);
  };

  // updatuje taska w bazie danych
  const handleDoneClick = () => {
    axios
      .post(`http://localhost:7000/edit-task/${taskId}`, {
        state: "done",
        endDate: new Date().toISOString(),
      })
      .then((result) => {
        console.log(result);
        navigate(`/tasks/${currentStory}`);
      })
      .catch((err) => console.log(err));

    navigate(`/tasks/${currentStory}`);
  };

  // usuwanie taska
  const handleDeleteTask = () => {
    axios
      .delete(`http://localhost:7000/edit-task/${taskId}`)
      .then((result) => {
        console.log(result);
        navigate(`/tasks/${currentStory}`);
      })
      .catch((err) => console.log(err));
    navigate(`/tasks/${currentStory}`);
  };

  return (
    <FormContainer>
      <h2>Edit Task</h2>
      <Form>
        <FormInput
          type="text"
          id="name"
          placeholder="Name"
          defaultValue={task?.name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextArea
          id="description"
          placeholder="Description"
          defaultValue={task?.description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Selector
          id="user"
          value={selectedUserId}
          onChange={(event) => setSelectedUserId(event.target.value)}
        >
          <option key="placeholder">Select a User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} ({user.role})
            </option>
          ))}
        </Selector>
        <div>
          <FormBtn onClick={handleEditTask}>Save</FormBtn>
          <FormBtn onClick={handleCancel}>Cancel</FormBtn>
          <FormBtn onClick={handleDoneClick}>Done</FormBtn>
          <DeleteBtn onClick={handleDeleteTask}>Delete</DeleteBtn>
        </div>
      </Form>
    </FormContainer>
  );
};

export default EditTask;
