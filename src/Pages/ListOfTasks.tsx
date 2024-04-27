import { useNavigate } from "react-router-dom";
import { UserService } from "../Services/UserService";
import { Task } from "../Models/Task";
import { TaskService } from "../Services/TaskService";
import { StoryService } from "../Services/StoryService";

const TasksView = () => {
  const navigate = useNavigate();

  let tasks: Task[] = [];
  const user = UserService.getLoggedInUser();

  const currentStory = StoryService.getCurrentStoryId();

  if (currentStory) {
    tasks = TaskService.getTasksByStoryId(currentStory);
  } else {
    console.log("There is no current tasks selected");
  }

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

  const handleClick = () => {
    navigate("/add-task/${projectId}");
  };

  return (
    <div className="tasks-container">
      <h1>Tasks</h1>
      <div className="button-user-view">
        <button className="add-story-btn" type="button" onClick={handleClick}>
          Add Task
        </button>
        <p className="logged-user">{user.firstName + " " + user.lastName}</p>
      </div>

      <div className="kanban-board">
        <div className="kanban-column">
          <h2>Todo</h2>
          <ul>
            {groupedTasks.todo.map((task) => (
              <li key={(task as Task).id}>{(task as Task).name}</li>
            ))}
          </ul>
        </div>
        <div className="kanban-column">
          <h2>Doing</h2>
          <ul>
            {groupedTasks.doing.map((task) => (
              <li key={(task as Task).id}>{(task as Task).name}</li>
            ))}
          </ul>
        </div>
        <div className="kanban-column">
          <h2>Done</h2>
          <ul>
            {groupedTasks.done.map((task) => (
              <li key={(task as Task).id}>{(task as Task).name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TasksView;
