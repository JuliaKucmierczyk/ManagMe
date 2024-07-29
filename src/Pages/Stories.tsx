import { useNavigate } from "react-router-dom";
import { Story } from "../Models/Story";
import { StoryService } from "../Services/StoryService";
import { SelectionService } from "../Services/SelectionService";
import { UserService } from "../Services/UserService";
import { TaskService } from "../Services/TaskService";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const Nav = styled.nav`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
const Btn = styled.button`
  background-color: dodgerblue;
  color: white;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem 1rem 0 0;
`;
const User = styled.span`
  margin-top: 2rem;
  font-weight: 700;
`;
export const Kanban = styled.article`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;
  gap: 3rem;

  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
export const Column = styled.div`
  background-color: #fff;
  padding: 20px;
  min-width: 20rem;
  min-height: 20rem;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  transition: 0.2s ease-in-out;

  ul {
    display: flex;
    flex-direction: column;
  }

  ul li {
    margin-bottom: 10px;
    padding: 10px 15px;
    border: 1px solid rgb(214, 214, 214);
    border-radius: 10px;
    background-color: #fff;

    display: flex;
    justify-content: space-between;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  ul li:hover {
    transform: translateY(-3px);
  }

  p {
    margin-bottom: 5px;
    font-size: 0.8rem;
  }

  p span {
    font-weight: bold;
  }

  h2 {
    margin-bottom: 15px;
    text-align: center;
    font-size: 1.2rem;
    color: #333;
  }
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
      (acc[story.status] as Story[]).push(story);
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

  const handleStoryClick = (storyId: number) => {
    navigate(`/tasks/${storyId}`);
    StoryService.setCurrentStoryId(storyId.toString());
  };

  return (
    <Container>
      <h1>Stories</h1>
      <Nav>
        <Btn type="button" onClick={handleClick}>
          Add Story
        </Btn>
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
