import { Action, createReducer, on } from "@ngrx/store";
import { AppState, initialState } from "./app.state";
import { assignTaskToUser, assignTaskToUserFail, assignTaskToUserSuccess, assignUserToTask, assignUserToTaskFail, assignUserToTaskSuccess, getAssigneeTask, getAssigneeTaskFail, getAssigneeTaskSuccess, getRequestTask, getRequestTaskFail, getRequestTaskSuccess, getTask, getTaskById, getTaskByIdFail, getTaskByIdSuccess, getTaskFail, getTaskSuccess, getTasksToBeAssigned, getTasksToBeAssignedFail, getTasksToBeAssignedSuccess, loadAllUser, loadAllUserSuccess, loadUser, loadUserFail, loadUserSuccess, loadUsers, loadUsersFail, loadUsersSuccess, logoutUser, postTask, postTaskFail, postTaskSuccess, requestTask, requestTaskFail, requestTaskSuccess, undoTaskRequest, undoTaskRequestFail, undoTaskRequestSuccess, updateTaskStatus, updateTaskStatusFail, updateTaskStatusSuccess } from "./app.action";

const _appReducer = createReducer(initialState,
    on(loadUser, (state)=>{
        return {
            ...state,
            loader: true,
            error: null
        }
    }),
    on(loadUserSuccess, (state, action) => {
        return {
            ...state,
            loader: false,
            user: action.user
        }
    }),
    on(loadUserFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(loadAllUser, (state)=>{
        return {
            ...state,
            error: null,
            loader: true,
            allUsers:[]
        }
    }),
    on(loadAllUserSuccess, (state, action) => {
        return {
            ...state,
            loader: false,
            allUsers: action.allUsers
        }
    }),
    on(loadUserFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(loadUsers, (state)=>{
        return {
            ...state,
            loader: true,
            error: null
        }
    }),
    on(loadUsersSuccess, (state, action) => {
        return {
            ...state,
            loader: false,
            users: action.users
        }
    }),
    on(loadUsersFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(logoutUser, (state)=>{
        return {
            ...state,
            user: null,
            users: []
        }
    }),
    on(requestTask, (state)=>{
        return {
            ...state,
            requestTask: null,
            loader: true,
            error: null
        }
    }),
    on(requestTaskSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            requestTask: action.response,
        }
    }),
    on(requestTaskFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(getRequestTask, (state)=>{
        return {
            ...state,
            requestTaskList: [],
            loader: true,
            error: null
        }
    }),
    on(getRequestTaskSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            requestTaskList: action.response,
        }
    }),
    on(getRequestTaskFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(getAssigneeTask, (state)=>{
        return {
            ...state,
            assigneeTaskList: [],
            loader: true,
            error: null
        }
    }),
    on(getAssigneeTaskSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            assigneeTaskList: action.response,
        }
    }),
    on(getAssigneeTaskFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(postTask, (state)=>{
        return {
            ...state,
            task: null,
            loader: true,
            error: null
        }
    }),
    on(postTaskSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            task: action.response,
        }
    }),
    on(postTaskFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(getTask, (state)=>{
        return {
            ...state,
            loader: true,
            taskList: [],
            error: null
        }
    }),
    on(getTaskSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            taskList: action.response,
        }
    }),
    on(getTaskFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(assignUserToTask, (state)=>{
        return {
            ...state,
            assignedUserToTask: null,
            loader: true,
            error: null
        }
    }),
    on(assignUserToTaskSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            assignedUserToTask: action.response,
        }
    }),
    on(assignUserToTaskFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(assignTaskToUser, (state)=>{
        return {
            ...state,
            loader: true,
            assignedTaskToUser: null,
            error: null
        }
    }),
    on(assignTaskToUserSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            assignedTaskToUser: action.response,
        }
    }),
    on(assignTaskToUserFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(getTasksToBeAssigned, (state)=>{
        return {
            ...state,
            loader: true,
            taskListToBeAssigned: [],
            error: null
        }
    }),
    on(getTasksToBeAssignedSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            taskListToBeAssigned: action.response,
        }
    }),
    on(getTasksToBeAssignedFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(getTaskById, (state)=>{
        return {
            ...state,
            loader: true,
            tasksById: [],
            error: null
        }
    }),
    on(getTaskByIdSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            tasksById: action.response,
        }
    }),
    on(getTaskByIdFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(undoTaskRequest, (state)=>{
        return {
            ...state,
            loader: true,
            undoRequestSuccess: false,
            error: null
        }
    }),
    on(undoTaskRequestSuccess, (state, action)=>{
        return {
            ...state,
            loader: false,
            undoRequestSuccess: action.response,
        }
    }),
    on(undoTaskRequestFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    }),
    on(updateTaskStatus, (state)=>{
        return {
            ...state,
            loader: true,
            error: null
        }
    }),
    on(updateTaskStatusSuccess, (state, action)=>{
        return {
            ...state,
            loader: false
        }
    }),
    on(updateTaskStatusFail, (state, action)=>{
        return {
            ...state,
            loader: false,
            error: action.error
        }
    })
);

export function appReducer(state: AppState | undefined, action: Action){
    return _appReducer(state, action);
}