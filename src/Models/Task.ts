import { User } from "./User";

export interface Task {
    id: string;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    storyId: string;
    state: 'todo' | 'doing' | 'done';
    createdAt: string | undefined;
    estimatedTime: number | undefined;
    startDate: string | undefined; 
    endDate: string | undefined;
    user: User | undefined;
}