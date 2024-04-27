import { useNavigate } from "react-router-dom";
import { Story } from "../Models/Story";

import { StoryService } from "../Services/StoryService";
import { SelectionService } from "../Services/SelectionService";

const StoriesView = () => {
  const navigate = useNavigate();
  let stories: Story[] = [];
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

  return (
    <div className="stories-container">
      <h1>Stories</h1>
      <div className="kanban-board">
        <div className="kanban-column">
          <h2>Todo</h2>
          <ul>
            {groupedStories.todo.map((story) => (
              <li key={(story as Story).id}>{(story as Story).name}</li>
            ))}
          </ul>
        </div>
        <div className="kanban-column">
          <h2>Doing</h2>
          <ul>
            {groupedStories.doing.map((story) => (
              <li key={(story as Story).id}>{(story as Story).name}</li>
            ))}
          </ul>
        </div>
        <div className="kanban-column">
          <h2>Done</h2>
          <ul>
            {groupedStories.done.map((story) => (
              <li key={(story as Story).id}>{(story as Story).name}</li>
            ))}
          </ul>
        </div>
      </div>
      <button type="button" onClick={handleClick}>
        Add Story
      </button>
    </div>
  );
};

export default StoriesView;
