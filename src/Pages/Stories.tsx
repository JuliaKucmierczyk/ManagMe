import { useNavigate } from "react-router-dom";
import { Story } from "../Models/Story";
import { StoryService } from "../Services/StoryService";
import { SelectionService } from "../Services/SelectionService";
import { UserService } from "../Services/UserService";
import styled from "styled-components";
import {
  Nav,
  Btn,
  User,
  Kanban,
  Column,
  Row,
} from "../Styles/StyledComponents";
import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "../Models/Task";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StoriesView = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const user = UserService.getLoggedInUser();
  const currentProject = SelectionService.getCurrentProjectId();

  useEffect(() => {
    const fetchStories = async () => {
      await axios
        .post("http://localhost:7000/stories", { projectId: currentProject })
        .then((response) => {
          setStories(response.data);
        })
        .catch((err) => console.log(err));
    };

    // zmien to pozniej na wszystkie taski w projekcie
    const fetchTasks = async () => {
      await axios
        .get("http://localhost:7000/tasks")
        .then((response) => {
          console.log(response.data);
          setTasks(response.data as Task[]);
        })
        .catch((err) => console.log(err));
    };

    fetchStories();
    fetchTasks();
  }, [currentProject]);

  const groupedStories: { todo: Story[]; doing: Story[]; done: Story[] } = {
    todo: [],
    doing: [],
    done: [],
  };

  function groupStoriesByState(
    stories: Story[],
    tasks: Task[]
  ): { todo: Story[]; doing: Story[]; done: Story[] } {
    // mapa taskow
    const taskMap: Record<string, Task[]> = {};
    tasks.forEach((task) => {
      const storyId = task.storyId;
      if (!taskMap[storyId]) {
        taskMap[storyId] = [];
      }
      taskMap[storyId].push(task);
    });

    stories.forEach((story) => {
      const tasksForStory = taskMap[story.id] || [];
      const allTasksAreTodo = tasksForStory.every(
        (task) => task.state === "todo"
      );
      const allTasksAreDone = tasksForStory.every(
        (task) => task.state === "done"
      );

      if (allTasksAreTodo) {
        groupedStories.todo.push(story);
      } else if (allTasksAreDone) {
        groupedStories.done.push(story);
      } else {
        groupedStories.doing.push(story);
      }
    });

    return groupedStories;
  }

  const handleClick = () => {
    navigate("/add-story");
  };

  const goToProjects = () => {
    navigate("/projects");
  };

  const handleStoryClick = (storyId: string) => {
    navigate(`/tasks/${storyId}`);
    StoryService.setCurrentStoryId(storyId);
  };

  groupStoriesByState(stories, tasks);
  return (
    <Container>
      <h1>Stories</h1>
      <Nav>
        <Row>
          <Btn type="button" onClick={goToProjects}>
            Projects
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
              </li>
            ))}
          </ul>
        </Column>
      </Kanban>
    </Container>
  );
};

export default StoriesView;
