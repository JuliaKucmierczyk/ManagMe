import { Story } from "./Story";
import { User } from "./User";

export interface Task {
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    story: Story;
    state: 'todo' | 'doing' | 'done';
    addedDate: Date;
    startDate: Date; // Pamiętaj że to się nie zapisze do localstorage
    endDate: Date;
    user: User;
}