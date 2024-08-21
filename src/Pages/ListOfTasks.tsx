import { useNavigate } from "react-router-dom";
import { UserService } from "../Services/UserService";
import { Task } from "../Models/Task";
import { TaskService } from "../Services/TaskService";
import { StoryService } from "../Services/StoryService";
import {
  Btn,
  Column,
  Kanban,
  Nav,
  Row,
  User,
} from "../Styles/StyledComponents";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { SelectionService } from "../Services/SelectionService";

const StyledPriority = styled.span`
  border: 1px solid;
  font-size: 0.7rem;
  padding: 0.6rem 0.8rem;
  border-radius: 3px;
  display: inline-block;

  ${(props) =>
    props.className === "low" &&
    `
    border-color: green;
    color: green;
    font-weight: 600;
    background-color: #f3fff3;
  `}

  ${(props) =>
    props.className === "medium" &&
    `
    border-color: blue;
    color: blue;
    font-weight: 600;
    background-color: #e7e7ff;
  `}

  ${(props) =>
    props.className === "high" &&
    `
    border-color: red;
    color: #cb0000;
    font-weight: 600;
    background-color: #ffe3e3;
  `}
`;

const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 2rem;
`;
const TaskNav = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const ListOfTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const user = UserService.getLoggedInUser();
  const currentStory = StoryService.getCurrentStoryId();

  useEffect(() => {
    const fetchTasks = async () => {
      await axios
        .post("http://localhost:7000/tasks", { storyId: currentStory })
        .then((response) => {
          console.log(response);
          setTasks(response.data);
        })
        .catch((err) => console.log(err));
    };

    fetchTasks();
  }, [currentStory]);

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      (acc[task.state] as Task[]).push(task);
      return acc;
    },
    {
      todo: [],
      doing: [],
      done: [],
    }
  );

  const goToProjects = () => {
    navigate("/projects");
  };

  const projectId = SelectionService.getCurrentProjectId();
  const goToStories = () => {
    navigate(`/stories/${projectId}`);
  };

  const handleClick = () => {
    navigate("/add-task");
  };

  const editTask = (taskId: string) => {
    navigate(`/edit-task/${taskId}`);
    TaskService.setCurrentTaskId(taskId);
  };

  return (
    <Container>
      <h1>Tasks</h1>
      <Nav>
        <Row>
          <Btn onClick={goToProjects}>Projects</Btn>
          <Btn onClick={goToStories}>Stories</Btn>
          <Btn onClick={handleClick}>Add Task</Btn>
        </Row>
        <User>{user.firstName + " " + user.lastName}</User>
      </Nav>

      <Kanban>
        <Column>
          <h2>Todo</h2>
          <ul>
            {groupedTasks.todo.map((task) => (
              <li key={(task as Task).id}>
                <Nav>
                  <h4>{(task as Task).name}</h4>
                  <TaskNav>
                    <StyledPriority className={(task as Task).priority}>
                      {(task as Task).priority}
                    </StyledPriority>

                    <Btn
                      type="submit"
                      className="edit-btn"
                      onClick={() => editTask((task as Task).id)}
                    >
                      Edit
                    </Btn>
                  </TaskNav>
                </Nav>
                <p>{(task as Task).description}</p>
                <p>
                  Created:{" "}
                  <span>
                    {new Date((task as Task).createdAt!).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </span>
                </p>
                <p>
                  Estimated Hours: <span>{(task as Task).estimatedTime}</span>
                </p>
              </li>
            ))}
          </ul>
        </Column>
        <Column>
          <h2>Doing</h2>
          <ul>
            {groupedTasks.doing.map((task) => (
              <li key={(task as Task).id}>
                <Nav>
                  <h4>{(task as Task).name}</h4>
                  <TaskNav>
                    <StyledPriority className={(task as Task).priority}>
                      {(task as Task).priority}
                    </StyledPriority>

                    <Btn
                      type="submit"
                      className="edit-btn"
                      onClick={() => editTask((task as Task).id)}
                    >
                      Edit
                    </Btn>
                  </TaskNav>
                </Nav>
                <p>{(task as Task).description}</p>
                <p>
                  Created:{" "}
                  <span>
                    {new Date((task as Task).createdAt!).toLocaleDateString(
                      "en-US",
                      { month: "long", day: "numeric", year: "numeric" }
                    )}
                  </span>
                </p>
                <p>
                  Estimated Hours: <span>{(task as Task).estimatedTime}</span>
                </p>
                <div className="dates">
                  <p>
                    Start Date:{" "}
                    <span>
                      {new Date((task as Task).startDate!).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </p>
                </div>
                <p>
                  Assigned:
                  <span>
                    {" " +
                      UserService.getUserById((task as Task).userId)
                        ?.firstName +
                      " " +
                      UserService.getUserById((task as Task).userId)?.lastName}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </Column>
        <Column>
          <h2>Done</h2>
          <ul>
            {groupedTasks.done.map((task) => (
              <li key={(task as Task).id}>
                <Nav>
                  <h4>{(task as Task).name}</h4>
                  <TaskNav>
                    <StyledPriority className={(task as Task).priority}>
                      {(task as Task).priority}
                    </StyledPriority>

                    <Btn
                      type="submit"
                      className="edit-btn"
                      onClick={() => editTask((task as Task).id)}
                    >
                      Edit
                    </Btn>
                  </TaskNav>
                </Nav>
                <p>{(task as Task).description}</p>
                <p>
                  Created:{" "}
                  <span>
                    <span>
                      {new Date((task as Task).createdAt!).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </span>
                </p>
                <p>
                  Estimated Hours: <span>{(task as Task).estimatedTime}</span>
                </p>
                <div className="dates">
                  <p>
                    Start Date:{" "}
                    <span>
                      {new Date((task as Task).startDate!).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </p>
                  <p>
                    EndDate:{" "}
                    <span>
                      {new Date((task as Task).endDate!).toLocaleDateString(
                        "en-US",
                        { month: "long", day: "numeric", year: "numeric" }
                      )}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Column>
      </Kanban>
    </Container>
  );
};

export default ListOfTasks;
