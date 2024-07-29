import { useNavigate } from "react-router-dom";
import { UserService } from "../Services/UserService";
import { Task } from "../Models/Task";
import { TaskService } from "../Services/TaskService";
import { StoryService } from "../Services/StoryService";
import { Column, Kanban } from "./Stories";

const ListOfTasks = () => {
  const navigate = useNavigate();
  const user = UserService.getLoggedInUser();
  const currentStory = StoryService.getCurrentStoryId();
  let tasks: Task[] = [];

  if (currentStory) {
    tasks = TaskService.getTasksByStoryId(currentStory);
  } else {
    console.log("Current story: " + currentStory);
    console.log("There is no current tasks for this id");
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
    navigate("/add-task");
  };

  const editTask = (taskId: string) => {
    navigate(`/edit-task/${taskId}`);
    TaskService.setCurrentTaskId(taskId);
  };

  return (
    <div className="tasks-container stories-container">
      <h1>Tasks</h1>
      <div className="button-user-view">
        <button className="add-story-btn" type="button" onClick={handleClick}>
          Add Task
        </button>
        <p className="logged-user">{user.firstName + " " + user.lastName}</p>
      </div>

      <Kanban>
        <Column>
          <h2>Todo</h2>
          <ul>
            {groupedTasks.todo.map((task) => (
              <li key={(task as Task).id}>
                <div className="button-user-view">
                  <h4>{(task as Task).name}</h4>
                  <button
                    type="submit"
                    className="edit-btn"
                    onClick={() => editTask((task as Task).id)}
                  >
                    Edit
                  </button>
                </div>
                <p>{(task as Task).description}</p>
                <p>
                  Created: <span>{(task as Task).createdAt}</span>
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
                <div className="button-user-view">
                  <h4>{(task as Task).name}</h4>
                  <button
                    type="submit"
                    className="edit-btn"
                    onClick={() => editTask((task as Task).id)}
                  >
                    Edit
                  </button>
                </div>
                <p>{(task as Task).description}</p>
                <p>
                  Created: <span>{(task as Task).createdAt}</span>
                </p>
                <p>
                  Estimated Hours: <span>{(task as Task).estimatedTime}</span>
                </p>
                <div className="dates">
                  <p>
                    Start Date: <span>{(task as Task).startDate}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Column>
        <Column>
          <h2>Done</h2>
          <ul>
            {groupedTasks.done.map((task) => (
              <li key={(task as Task).id}>
                <div className="button-user-view">
                  <h4>{(task as Task).name}</h4>
                  <button
                    type="submit"
                    className="edit-btn"
                    onClick={() => editTask((task as Task).id)}
                  >
                    Edit
                  </button>
                </div>
                <p>{(task as Task).description}</p>
                <p>
                  Created: <span>{(task as Task).createdAt}</span>
                </p>
                <p>
                  Estimated Hours: <span>{(task as Task).estimatedTime}</span>
                </p>
                <div className="dates">
                  <p>
                    Start Date: <span>{(task as Task).startDate}</span>
                  </p>
                  <p>
                    EndDate: <span>{(task as Task).endDate}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Column>
      </Kanban>
    </div>
  );
};

export default ListOfTasks;
