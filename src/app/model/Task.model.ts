import { TaskPriority } from "../enums/task-priority.enum";
import { TaskStatus } from "../enums/task-status.enum";

export interface Task{
    id?: number;
    title: string;
    priority: TaskPriority;
    status: TaskStatus;
    assignedTo?: number;
}