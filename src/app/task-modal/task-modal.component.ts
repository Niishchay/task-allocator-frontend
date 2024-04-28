import { Component } from '@angular/core';
import { TaskPriority } from '../enums/task-priority.enum';
import { TaskStatus } from '../enums/task-status.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent {
  
  taskFormGroup!: FormGroup
  priorityValues = Object.values(TaskPriority);
  statusValues = Object.values(TaskStatus);

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<TaskModalComponent>){
    this.taskFormGroup = this.fb.group({
      title: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  submit(){
    if(this.taskFormGroup.valid){
      this.dialogRef.close(this.taskFormGroup.value);
    }
  }

  closePopup(){
    this.dialogRef.close();
  }
}
