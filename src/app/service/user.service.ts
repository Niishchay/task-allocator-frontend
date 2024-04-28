import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, tap} from "rxjs";
import { UserStatus } from "../enums/user-status.enum";
import { User } from "../model/user.model";
import { RequestTask } from "../model/request-task.model";
import { Task } from "../model/Task.model";
import { TaskStatus } from "../enums/task-status.enum";

@Injectable({
    providedIn: "root"
})
export class UserService{ 

    constructor(private http: HttpClient){}

    public getLeads(userId: number): Observable<User[]>{
        const params = new HttpParams().set('userId', userId);
        const url = "http://localhost:3036/api/lead";
        return this.http.get<User[]>(url, { params });
    }

    public getAllUsers(): Observable<User[]>{
        const url = "http://localhost:3036/api/users";
        return this.http.get<User[]>(url);
    }

    public updateUserStatus(id: number | undefined, status: string): Observable<User>{
        const params = new HttpParams().set('status', status);
        const url = `http://localhost:3036/api/update-status/${id}`
        return this.http.put<User>(url, null, {params});
    }

    public requestTask(requestTaskData: RequestTask){
        const url = "http://localhost:3036/api/task-request/create-task-request";
        return this.http.post<RequestTask>(url, requestTaskData);
    }

    public getRequesterTask(id: number | undefined):Observable<RequestTask[]>{
        const url = `http://localhost:3036/api/task-request/requester-task-list/${id}`
        return this.http.get<RequestTask[]>(url);
    }

    public getAssigneeTask(id: number | undefined):Observable<RequestTask[]>{
        const url = `http://localhost:3036/api/task-request/assignee-task-list/${id}`
        return this.http.get<RequestTask[]>(url);
    }

    public createTask(task: Task):Observable<Task>{
        const url = `http://localhost:3036/api/task/create-task`;
        return this.http.post<Task>(url, task);
    }

    public getTask():Observable<Task[]>{
        const url = `http://localhost:3036/api/task/get-task`;
        return this.http.get<Task[]>(url);
    }

    public assignUserToTaskById(userId: number, taskId: number):Observable<Task>{
        const params = new HttpParams().set('userId', userId);
        const url = `http://localhost:3036/api/task/assign-user/${taskId}`;
        return this.http.put<Task>(url, null, { params });
    }

    public assignTaskToUserById(taskRequestId: number, taskId: number):Observable<Task>{
        const params = new HttpParams().set('taskId', taskId);
        const url = `http://localhost:3036/api/task/assign-task/${taskRequestId}`;
        return this.http.put<Task>(url, null, { params });
    }

    public getTaskToBeAssigned():Observable<Task[]>{
        const url = `http://localhost:3036/api/task/get-task-assigned`;
        return this.http.get<Task[]>(url);
    }

    public getTaskById(id: number | undefined):Observable<Task[]>{
        const url = `http://localhost:3036/api/task/get-task/${id}`;
        return this.http.get<Task[]>(url)
    }

    public undoTaskRequest(id: number | undefined):Observable<boolean>{
        const url = `http://localhost:3036/api/task-request/undo-task-request/${id}`;
        return this.http.put<boolean>(url, null);
    }

    public updateTaskStatus(id: number | undefined, status: string){
        const params = new HttpParams().set('status', status);
        const url = `http://localhost:3036/api/task/update-task-status/${id}`;
        return this.http.put(url, null, { params });
    }
}