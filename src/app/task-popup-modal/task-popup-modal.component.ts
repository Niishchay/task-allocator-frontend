import { Component, Inject } from '@angular/core';
import { Task } from '../model/Task.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getTasksToBeAssigned } from '../state/app.action';
import { selectTaskListToBeAssigned } from '../state/app.selector';

@Component({
  selector: 'app-task-popup-modal',
  templateUrl: './task-popup-modal.component.html',
  styleUrls: ['./task-popup-modal.component.scss']
})
export class TaskPopupModalComponent {

  
  selectedTask!: Task;
  tasks!: Task[];

  constructor(private store: Store<{app: AppState}>, @Inject(MAT_DIALOG_DATA) public data: number, private dialogRef: MatDialogRef<TaskPopupModalComponent>){}

  ngOnInit() {
    this.store.dispatch(getTasksToBeAssigned());
    this.store.select(selectTaskListToBeAssigned).pipe().subscribe(tasks=>{
      if(tasks && tasks.length > 0){
        this.tasks = tasks;
      }
    })
  } 

  capitalize(username: string){
    return username.charAt(0).toUpperCase() + username.slice(1);
  }

}
