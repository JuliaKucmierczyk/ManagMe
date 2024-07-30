import { useNavigate } from "react-router-dom";
import { Story } from "../Models/Story";
import { StoryService } from "../Services/StoryService";
import { SelectionService } from "../Services/SelectionService";
import { UserService } from "../Services/UserService";
import { TaskService } from "../Services/TaskService";
import styled from "styled-components";
import {
  Nav,
  Btn,
  User,
  Kanban,
  Column,
  Row,
} from "../Styles/StyledComponents";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StoriesView = () => {
  const navigate = useNavigate();
  let stories: Story[] = [];
  const user = UserService.getLoggedInUser();

  const currentProject = SelectionService.getCurrentProjectId();
  if (currentProject) {
    stories = StoryService.getAllStoriesByProjectId(currentProject);
  } else {
    console.log("There is no current project selected");
  }

  const groupedStories = stories.reduce(
    (acc, story) => {
      const tasks = TaskService.getTasksByStoryId(story.id.toString());
      const isDoing = tasks.some((task) => task.state === "doing");
      const isDone = tasks.every((task) => task.state === "done");
      const isToDo = tasks.every((task) => task.state === "todo");

      if (isToDo) {
        (acc["todo"] as Story[]).push(story);
      } else if (isDone) {
        (acc["done"] as Story[]).push(story);
      } else if (isDoing) {
        (acc["doing"] as Story[]).push(story);
      }

      return acc;
    },
    {
      todo: [],
      doing: [],
      done: [],
    }
  );

  const handleClick = () => {
    navigate("/add-story");
  };

  const goBack = () => {
    navigate("/");
  };

  const handleStoryClick = (storyId: number) => {
    navigate(`/tasks/${storyId}`);
    StoryService.setCurrentStoryId(storyId.toString());
  };

  return (
    <Container>
      <h1>Stories</h1>
      <Nav>
        <Row>
          <Btn type="button" onClick={goBack}>
            Go Back
          </Btn>
          <Btn type="button" onClick={handleClick}>
            Create new Story
          </Btn>
        </Row>
        <User>{user.firstName + " " + user.lastName}</User>
      </Nav>

      <Kanban>
        <Column>
          <h2>Todo</h2>
          <ul>
            {groupedStories.todo.map((story) => (
              <li
                key={(story as Story).id}
                onClick={() => handleStoryClick((story as Story).id)}
              >
                <Nav>
                  <div>{(story as Story).name}</div>
                  <span>
                    {TaskService.getNumberOfTasksInStory(
                      (story as Story).id.toString()
                    )}
                  </span>
                </Nav>
              </li>
            ))}
          </ul>
        </Column>
        <Column>
          <h2>Doing</h2>
          <ul>
            {groupedStories.doing.map((story) => (
              <li
                key={(story as Story).id}
                onClick={() => handleStoryClick((story as Story).id)}
              >
                <div>{(story as Story).name}</div>
                <span>
                  {TaskService.getNumberOfTasksInStory(
                    (story as Story).id.toString()
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Column>
        <Column>
          <h2>Done</h2>
          <ul>
            {groupedStories.done.map((story) => (
              <li
                key={(story as Story).id}
                onClick={() => handleStoryClick((story as Story).id)}
              >
                <div>{(story as Story).name}</div>
                <span>
                  {TaskService.getNumberOfTasksInStory(
                    (story as Story).id.toString()
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Column>
      </Kanban>
    </Container>
  );
};

export default StoriesView;
