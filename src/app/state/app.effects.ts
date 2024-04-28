import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginSignupService } from "../service/login-signup.service";
import { catchError, map, mergeMap, of } from "rxjs";
import { assignTaskToUser, assignTaskToUserFail, assignTaskToUserSuccess, assignUserToTask, assignUserToTaskFail, assignUserToTaskSuccess, getAssigneeTask, getAssigneeTaskFail, getAssigneeTaskSuccess, getRequestTask, getRequestTaskFail, getRequestTaskSuccess, getTask, getTaskById, getTaskByIdFail, getTaskByIdSuccess, getTaskFail, getTaskSuccess, getTasksToBeAssigned, getTasksToBeAssignedFail, getTasksToBeAssignedSuccess, loadAllUser, loadAllUserFail, loadAllUserSuccess, loadUser, loadUserFail, loadUserSuccess, loadUsers, loadUsersFail, loadUsersSuccess, postTask, postTaskFail, postTaskSuccess, requestTask, requestTaskFail, requestTaskSuccess, undoTaskRequest, undoTaskRequestFail, undoTaskRequestSuccess, updateStatus, updateStatusFail, updateStatusSuccess, updateTaskStatus, updateTaskStatusFail, updateTaskStatusSuccess } from "./app.action";
import { UserService } from "../service/user.service";

@Injectable({
    providedIn: "root"
})
export class appEffects{

    constructor(
        private actions$: Actions,
        private loginSignupService: LoginSignupService,
        private userService: UserService
      ) {}

    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(loadUser),
        mergeMap(({ user }) =>
            this.loginSignupService.login(user).pipe(
                map(userData => loadUserSuccess({ user: userData })),
                catchError(error => of(loadUserFail({ error })))
            )
        )
    ));

    loadAllUser$ = createEffect(() => this.actions$.pipe(
        ofType(loadAllUser),
        mergeMap(() =>
            this.userService.getAllUsers().pipe(
                map(userData => loadAllUserSuccess({ allUsers: userData })),
                catchError(error => of(loadAllUserFail({ error })))
            )
        )
    ));

    loadUsers$ = createEffect(()=> this.actions$.pipe(
        ofType(loadUsers),
        mergeMap((action)=>
            this.userService.getLeads(action.id).pipe(
                map(data=> loadUsersSuccess({users: data})),
                catchError(error => of(loadUsersFail({error})))
            ))
    ));

    updateStatus$ = createEffect(()=> this.actions$.pipe(
        ofType(updateStatus),
        mergeMap((action)=>
            this.userService.updateUserStatus(action.id, action.status).pipe(
                map(data => updateStatusSuccess({user: data})),
                catchError(error => of(updateStatusFail({error})))
            ))
    ));

    requestTask$ = createEffect(()=> this.actions$.pipe(
        ofType(requestTask),
        mergeMap(action=>
            this.userService.requestTask(action.payload).pipe(
                map(data=> requestTaskSuccess({response: data})),
                catchError(error => of(requestTaskFail({error})))
            ))
    ));

    getRequesterTask$ = createEffect(()=> this.actions$.pipe(
        ofType(getRequestTask),
        mergeMap(action=>
            this.userService.getRequesterTask(action.id).pipe(
                map(data=> getRequestTaskSuccess({response: data})),
                catchError(error => of(getRequestTaskFail({error})))
            ))
    ))

    getAssigneeTask$ = createEffect(()=> this.actions$.pipe(
        ofType(getAssigneeTask),
        mergeMap(action=>
            this.userService.getAssigneeTask(action.id).pipe(
                map(data=> getAssigneeTaskSuccess({response: data})),
                catchError(error => of(getAssigneeTaskFail({error})))
            ))
    ))

    postTask$ = createEffect(()=> this.actions$.pipe(
        ofType(postTask),
        mergeMap(action=>
            this.userService.createTask(action.payload).pipe(
                map(data=> postTaskSuccess({response: data})),
                catchError(error => of(postTaskFail({error})))
            ))
    ))

    getTask$ = createEffect(()=> this.actions$.pipe(
        ofType(getTask),
        mergeMap(()=>
            this.userService.getTask().pipe(
                map(data=> getTaskSuccess({response: data})),
                catchError(error => of(getTaskFail({error})))
            ))
    ))

    assignUserToTask$ = createEffect(()=> this.actions$.pipe(
        ofType(assignUserToTask),
        mergeMap((action)=>
            this.userService.assignUserToTaskById(action.userId, action.taskId).pipe(
                map(data=> assignUserToTaskSuccess({response: data})),
                catchError(error => of(assignUserToTaskFail({error})))
            ))
    ))

    assignTaskToUser$ = createEffect(()=> this.actions$.pipe(
        ofType(assignTaskToUser),
        mergeMap((action)=>
            this.userService.assignTaskToUserById(action.taskRequestId, action.taskId).pipe(
                map(data=> assignTaskToUserSuccess({response: data})),
                catchError(error => of(assignTaskToUserFail({error})))
            ))
    ))

    getTaskToBeAssigned$ = createEffect(()=> this.actions$.pipe(
        ofType(getTasksToBeAssigned),
        mergeMap(()=>
            this.userService.getTaskToBeAssigned().pipe(
                map(data=> getTasksToBeAssignedSuccess({response: data})),
                catchError(error => of(getTasksToBeAssignedFail({error})))
            ))
    ))

    getTaskById$ = createEffect(()=> this.actions$.pipe(
        ofType(getTaskById),
        mergeMap((action)=>
            this.userService.getTaskById(action.userId).pipe(
                map(data=> getTaskByIdSuccess({response: data})),
                catchError(error => of(getTaskByIdFail({error})))
            ))
    ))

    undoTaskRequest$ = createEffect(()=> this.actions$.pipe(
        ofType(undoTaskRequest),
        mergeMap((action)=>
            this.userService.undoTaskRequest(action.taskRequestId).pipe(
                map(data=> undoTaskRequestSuccess({response: data})),
                catchError(error => of(undoTaskRequestFail({error})))
            ))
    ))

    updateTaskStatus$ = createEffect(()=> this.actions$.pipe(
        ofType(updateTaskStatus),
        mergeMap((action)=>
            this.userService.updateTaskStatus(action.id, action.status).pipe(
                map(()=> updateTaskStatusSuccess()),
                catchError(error => of(updateTaskStatusFail({error})))
            ))
    ))
}