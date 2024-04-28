import { createAction, props } from "@ngrx/store";
import { User } from "../model/user.model";
import { RequestTask } from "../model/request-task.model";
import { Task } from "../model/Task.model";

//load user
const LOAD_USER = "[user] load user";
const LOAD_USER_SUCCESS = "[user] load user success";
const LOAD_USER_FAIL = "[user] load user fail";

//load user
const LOAD_ALL_USER = "[user] load all user";
const LOAD_ALL_USER_SUCCESS = "[user] load all user success";
const LOAD_ALL_USER_FAIL = "[user] load all user fail";

//load users
const LOAD_USERS = "[user] load users";
const LOAD_USERS_SUCCESS = "[user] load users success";
const LOAD_USERS_FAIL = "[user] load users fail";

//update status
const UPDATE_STATUS = "[user] update status";
const UPDATE_STATUS_SUCCESS = "[user] update status success";
const UPDATE_STATUS_FAIL = "[user] update status fail";

//request task
const REQUEST_TASK = "[user] request task";
const REQUEST_TASK_SUCCESS = "[user] request task success";
const REQUEST_TASK_FAIL = "[user] request task fail";

//get request task
const GET_REQUEST_TASK = "[user] get request task";
const GET_REQUEST_TASK_SUCCESS = "[user] get request task success";
const GET_REQUEST_TASK_FAIL = "[user] get request task fail";

//get request task
const GET_TASK = "[user] get task";
const GET_TASK_SUCCESS = "[user] get task success";
const GET_TASK_FAIL = "[user] get task fail";

//get assignee task
const GET_ASSIGNEE_TASK = "[user] get assignee task";
const GET_ASSIGNEE_TASK_SUCCESS = "[user] get assignee task success";
const GET_ASSIGNEE_TASK_FAIL = "[user] get assignee task fail";

//create Task
const POST_TASK = "[user] post task";
const POST_TASK_SUCCESS = "[user] post task success";
const POST_TASK_FAIL = "[user] post task task fail";

//assign user to task
const ASSIGN_USER_TO_TASK = "[user] assign user to task";
const ASSIGN_USER_TO_TASK_SUCCESS = "[user] assign user to task success";
const ASSIGN_USER_TO_TASK_FAIL = "[user] assign user to task fail";

//get tasks to be assigned
const GET_TASKS_TO_BE_ASSIGNED = "[user] get task to be assigned";
const GET_TASKS_TO_BE_ASSIGNED_SUCCESS = "[user] get task to be assigned success";
const GET_TASKS_TO_BE_ASSIGNED_FAIL = "[user] get task to be assigned fail";

//assign task to user
const ASSIGN_TASK_TO_USER = "[user] assign task to user";
const ASSIGN_TASK_TO_USER_SUCCESS = "[user] assign task to user success";
const ASSIGN_TASK_TO_USER_FAIL = "[user] assign task to user fail";

//get all task by id
const GET_TASKS_BY_ID = "[user] get task by user id";
const GET_TASKS_BY_ID_SUCCESS = "[user] get task by user id success";
const GET_TASKS_BY_ID_FAIL = "[user] get task by user id fail";

//undo task request
const UNDO_TASK_REQUEST_BY_ID = "[user] undo task request by id";
const UNDO_TASK_REQUEST_BY_ID_SUCCESS = "[user] undo task request by id success";
const UNDO_TASK_REQUEST_BY_ID_FAIL = "[user] undo task request by id fail";

//update task status
const UPDATE_TASK_STATUS_BY_ID = "[user] update task status by id";
const UPDATE_TASK_STATUS_BY_ID_SUCCESS = "[user] update task status by id success";
const UPDATE_TASK_STATUS_BY_ID_FAIL = "[user] update task status by id fail";

//logout user
const LOGOUT_USER = "[user] logout user";

//load user
export const loadUser = createAction(LOAD_USER, props<{user: User}>());
export const loadUserSuccess = createAction(LOAD_USER_SUCCESS, props<{user: User}>());
export const loadUserFail = createAction(LOAD_USER_FAIL, props<{error: any}>());

//load all user
export const loadAllUser = createAction(LOAD_ALL_USER);
export const loadAllUserSuccess = createAction(LOAD_ALL_USER_SUCCESS, props<{allUsers: User[]}>());
export const loadAllUserFail = createAction(LOAD_ALL_USER_FAIL, props<{error: any}>());

//load users
export const loadUsers = createAction(LOAD_USERS, props<{id: number}>());
export const loadUsersSuccess = createAction(LOAD_USERS_SUCCESS, props<{users: User[]}>());
export const loadUsersFail = createAction(LOAD_USERS_FAIL, props<{error: any}>());

//update status
export const updateStatus = createAction(UPDATE_STATUS, props<{id: number | undefined, status: string}>());
export const updateStatusSuccess = createAction(UPDATE_STATUS_SUCCESS, props<{user: User}>());
export const updateStatusFail = createAction(UPDATE_STATUS_FAIL, props<{error: any}>());

//request status
export const requestTask = createAction(REQUEST_TASK, props<{payload: RequestTask}>());
export const requestTaskSuccess = createAction(REQUEST_TASK_SUCCESS, props<{response: RequestTask}>());
export const requestTaskFail = createAction(REQUEST_TASK_FAIL, props<{error: any}>());

//get requester task
export const getRequestTask = createAction(GET_REQUEST_TASK, props<{id: number | undefined}>());
export const getRequestTaskSuccess = createAction(GET_REQUEST_TASK_SUCCESS, props<{response: RequestTask[]}>());
export const getRequestTaskFail = createAction(GET_REQUEST_TASK_FAIL, props<{error: any}>());

//get assignee task
export const getAssigneeTask = createAction(GET_ASSIGNEE_TASK, props<{id: number | undefined}>());
export const getAssigneeTaskSuccess = createAction(GET_ASSIGNEE_TASK_SUCCESS, props<{response: RequestTask[]}>());
export const getAssigneeTaskFail = createAction(GET_ASSIGNEE_TASK_FAIL, props<{error: any}>());

//create task
export const postTask = createAction(POST_TASK, props<{payload: Task}>());
export const postTaskSuccess = createAction(POST_TASK_SUCCESS, props<{response: Task}>());
export const postTaskFail = createAction(POST_TASK_FAIL, props<{error: any}>());

//get task
export const getTask = createAction(GET_TASK);
export const getTaskSuccess = createAction(GET_TASK_SUCCESS, props<{response: Task[]}>());
export const getTaskFail = createAction(GET_TASK_FAIL, props<{error: any}>());

//assign user to task
export const assignUserToTask = createAction(ASSIGN_USER_TO_TASK, props<{userId: number, taskId: number}>());
export const assignUserToTaskSuccess = createAction(ASSIGN_USER_TO_TASK_SUCCESS, props<{response: Task}>());
export const assignUserToTaskFail = createAction(ASSIGN_USER_TO_TASK_FAIL, props<{error: any}>());

//get tasks to be assigned
export const getTasksToBeAssigned = createAction(GET_TASKS_TO_BE_ASSIGNED);
export const getTasksToBeAssignedSuccess = createAction(GET_TASKS_TO_BE_ASSIGNED_SUCCESS, props<{response: Task[]}>());
export const getTasksToBeAssignedFail = createAction(GET_TASKS_TO_BE_ASSIGNED_FAIL, props<{error: any}>());

//assign task to user
export const assignTaskToUser = createAction(ASSIGN_TASK_TO_USER, props<{taskRequestId: number, taskId: number}>());
export const assignTaskToUserSuccess = createAction(ASSIGN_TASK_TO_USER_SUCCESS, props<{response: Task}>());
export const assignTaskToUserFail = createAction(ASSIGN_TASK_TO_USER_FAIL, props<{error: any}>());

//assign task to user
export const getTaskById = createAction(GET_TASKS_BY_ID, props<{userId: number | undefined}>());
export const getTaskByIdSuccess = createAction(GET_TASKS_BY_ID_SUCCESS, props<{response: Task[]}>());
export const getTaskByIdFail = createAction(GET_TASKS_BY_ID_FAIL, props<{error: any}>());

//assign task to user
export const undoTaskRequest = createAction(UNDO_TASK_REQUEST_BY_ID, props<{taskRequestId: number | undefined}>());
export const undoTaskRequestSuccess = createAction(UNDO_TASK_REQUEST_BY_ID_SUCCESS, props<{response: boolean}>());
export const undoTaskRequestFail = createAction(UNDO_TASK_REQUEST_BY_ID_FAIL, props<{error: any}>());

//update task status
export const updateTaskStatus = createAction(UPDATE_TASK_STATUS_BY_ID, props<{id: number | undefined, status: string}>());
export const updateTaskStatusSuccess = createAction(UPDATE_TASK_STATUS_BY_ID_SUCCESS);
export const updateTaskStatusFail = createAction(UPDATE_TASK_STATUS_BY_ID_FAIL, props<{error: any}>());

//logout user
export const logoutUser = createAction(LOGOUT_USER);