import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

const userSelectorFeature = createFeatureSelector<AppState>('app');

export const selectUser = createSelector(userSelectorFeature, (state)=> state.user);

export const selectAllUser = createSelector(userSelectorFeature, (state)=> state.allUsers);

export const selectUsers = createSelector(userSelectorFeature, (state)=> state.users);

export const selectRequestTask = createSelector(userSelectorFeature, (state)=> state.requestTask);

export const selectRequestTaskList = createSelector(userSelectorFeature, (state)=> state.requestTaskList);

export const selectAssigneeTaskList = createSelector(userSelectorFeature, (state)=> state.assigneeTaskList);

export const selectTask = createSelector(userSelectorFeature, (state)=> state.task);

export const selectTaskList = createSelector(userSelectorFeature, (state)=> state.taskList);

export const selectAssignedUserToTask = createSelector(userSelectorFeature, (state)=> state.assignedUserToTask);

export const selectTaskListToBeAssigned = createSelector(userSelectorFeature, (state)=> state.taskListToBeAssigned);

export const selectAssignedTaskToUser = createSelector(userSelectorFeature, (state)=> state.assignedTaskToUser);

export const selectTaskById = createSelector(userSelectorFeature, (state)=> state.tasksById);

export const selectLoader = createSelector(userSelectorFeature, (state) => state.loader);

export const selectUndoRequestSuccess = createSelector(userSelectorFeature, (state)=> state.undoRequestSuccess);

export const error = createSelector(userSelectorFeature, (state)=> state.error);