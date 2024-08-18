import { useNavigate, useParams } from "react-router-dom";
// import { TaskService } from "../Services/TaskService";
import { Task } from "../Models/Task";
import { useEffect, useState } from "react";
import { StoryService } from "../Services/StoryService";
// import { UserService } from "../Services/UserService";
// import { User } from "../Models/User";
import {
  FormInput,
  FormContainer,
  Form,
  FormBtn,
  TextArea,
} from "../Styles/StyledComponents";
import axios from "axios";

const EditTask = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [user, setUser] = useState<User>();
  // const [users, setUsers] = useState<User[]>([]);
  const [task, setTask] = useState<Task | null>(null);

  // const users = UserService.getAllDevs();
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
          //setUser(response.data.user);
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
        startDate: new Date().toISOString(),
        state: "doing",
      })
      .then((result) => {
        console.log(result);
        navigate(`/tasks/${currentStory}`);
      })
      .catch((err) => console.log(err));
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
        {/* <Selector
          id="user"
          value={user?.id}
          onChange={(event) => setUser(event.target.value as unknown as User)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} ({user.role})
            </option>
          ))}
        </Selector> */}
        <div>
          <FormBtn onClick={handleEditTask}>Save</FormBtn>
          <FormBtn onClick={handleCancel}>Cancel</FormBtn>
          <FormBtn onClick={handleDoneClick}>Done</FormBtn>
        </div>
      </Form>
    </FormContainer>
  );
};

export default EditTask;
