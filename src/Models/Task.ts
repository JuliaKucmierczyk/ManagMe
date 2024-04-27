
export interface Task {
    id: string;
    name: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    storyId: string;
    state: 'todo' | 'doing' | 'done';
    createdAt: Date;
    estimatedTime: number;
    startDate: Date | null; // Pamiętaj że to się nie zapisze do localstorage
    endDate: Date | null;
    userId: string | null;
}