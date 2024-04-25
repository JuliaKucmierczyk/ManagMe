export interface Story {
    id: number;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    projectId: string;
    creationDate: Date;
    status: 'todo' | 'doing' | 'done';
    ownerId: string;
}

export const mockStories: Story[] = [
  {
    id: 1, 
    name: "Develop Core Functionality",
    description: "Implement the core features and functionalities of the project.",
    priority: "high",
    projectId: "1",
    creationDate: new Date(2024, 3, 25),
    status: "todo",
    ownerId: "user-1", 
  },
  {
    id: 2, 
    name: "Design User Interface",
    description: "Create a user-friendly and intuitive interface for the project.",
    priority: "medium",
    projectId: "1",
    creationDate: new Date(2024, 3, 22),
    status: "doing",
    ownerId: "user-2", 
  },
  {
    id: 3, 
    name: "Write Unit Tests",
    description: "Develop unit tests to ensure code quality and functionality.",
    priority: "medium",
    projectId: "1",
    creationDate: new Date(2024, 3, 19),
    status: "todo",
    ownerId: "user-3", 
  },
  {
    id: 4, 
    name: "Plan Project Phases",
    description: "Define clear project phases with timelines and deliverables.",
    priority: "high",
    projectId: "2",
    creationDate: new Date(2024, 3, 23),
    status: "doing",
    ownerId: "user-4", 
  },
  {
    id: 5, 
    name: "Identify Team Members",
    description: "Assign roles and responsibilities to team members.",
    priority: "medium",
    projectId: "2",
    creationDate: new Date(2024, 3, 21),
    status: "done",
    ownerId: "user-5", 
  },
  {
    id: 6, 
    name: "Establish Communication Channels",
    description: "Set up communication channels for project updates and discussions.",
    priority: "low",
    projectId: "2",
    creationDate: new Date(2024, 3, 18),
    status: "todo",
    ownerId: "user-6", 
  },
]