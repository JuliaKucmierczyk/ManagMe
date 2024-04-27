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
