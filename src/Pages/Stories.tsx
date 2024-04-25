import { Story } from "../Models/Story";
import React from "react";

interface Props {
  stories: Story[];
}

const StoriesView: React.FC<Props> = ({ stories }) => {
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
    </div>
  );
};

export default StoriesView;
