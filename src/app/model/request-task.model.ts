import { RequestTaskEnum } from "../enums/request-task.enum";

export interface RequestTask{
    id?: number;
    requesterId: number | undefined;
    requesterUsername?: string;
    assigneeId: number;
    assigneeUsername?: string;
    taskId?: number;
    requestStatus?: RequestTaskEnum;
    requestDate?: string;
}