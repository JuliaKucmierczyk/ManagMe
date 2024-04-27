import { Task } from "../Models/Task";

export class TaskService {
    private readonly STORAGE_KEY = 'tasks';
  
    constructor() {}
  
    getAllTasks(): Task[] {
      const tasksJson = localStorage.getItem(this.STORAGE_KEY);
      return tasksJson ? JSON.parse(tasksJson) : [];
    }
  
    getTaskById(taskId: string): Task | null {
      const tasks = this.getAllTasks();
      return tasks.find(task => task.id === taskId) || null;
    }

    getTaskByStoryId(storyId: string): Task[] {
        const tasks = this.getAllTasks();
        return tasks.filter(task => task.storyId === storyId);
      }
  
    createTask(task: Task): void {
      const tasks = this.getAllTasks();
      tasks.push(task);
      this.setTasks(tasks);
    }
  
    updateTask(taskId: string, updatedTask: Task): void {
      const tasks = this.getAllTasks();
      const index = tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        tasks[index] = updatedTask;
        this.setTasks(tasks);
      }
    }
  
    deleteTask(taskId: string): void {
      const tasks = this.getAllTasks();
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      this.setTasks(filteredTasks);
    }
  
    assignUserToTask(taskId: string, userId: string): void {
      const task = this.getTaskById(taskId);
      if (task) {
        task.userId = userId;
        task.state = 'doing';
        task.startDate = new Date();
        this.updateTask(taskId, task);
      }
    }
  
    markTaskAsDone(taskId: string): void {
      const task = this.getTaskById(taskId);
      if (task) {
        task.state = 'done';
        task.endDate = new Date();
        this.updateTask(taskId, task);
      }
    }
  
    private setTasks(tasks: Task[]): void {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
  }