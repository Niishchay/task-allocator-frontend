import { Task } from "../model/Task.model";
import { RequestTask } from "../model/request-task.model";
import { User } from "../model/user.model"

export interface AppState{
    allUsers: User[];
    user: User | null;
    users: User[];
    requestTask: RequestTask | null;
    requestTaskList: RequestTask[];
    assigneeTaskList: RequestTask[];
    task: Task | null;
    taskList: Task[];
    assignedUserToTask: Task | null;
    taskListToBeAssigned: Task[];
    assignedTaskToUser: Task | null;
    tasksById: Task[];
    loader: boolean;
    undoRequestSuccess: boolean;
    error: any;
}

export const initialState: AppState = {
    allUsers: [],
    user: null,
    users: [],
    requestTask: null,
    requestTaskList: [],
    assigneeTaskList: [],
    task: null,
    taskList: [],
    assignedUserToTask: null,
    taskListToBeAssigned: [],
    assignedTaskToUser: null,
    tasksById: [],
    loader: false,
    undoRequestSuccess: false,
    error: null
}