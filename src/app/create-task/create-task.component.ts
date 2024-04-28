import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { assignUserToTask, getTask, postTask } from '../state/app.action';
import { selectAssignedUserToTask, selectTask, selectTaskList } from '../state/app.selector';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../model/Task.model';
import { PopupModalComponent } from '../user-popup-modal/popup-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'priority', 'status', 'assignedTo', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription$!: Subscription;

  constructor(private store: Store<{app: AppState}>, private dialog: MatDialog){}

  ngOnInit() {
    this.getTaskList();
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(TaskModalComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
        this.store.dispatch(postTask({payload: data}));
        this.store.select(selectTask).subscribe(data=>{
          if(data){
            this.getTaskList();
          }
        })
      }
    })
  }

  getTaskList() {
    this.store.dispatch(getTask());
    this.store.select(selectTaskList).subscribe(data=>{
      this.dataSource = new MatTableDataSource<Task>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  assignTask(taskId: number){
    const dialogRef = this.dialog.open(PopupModalComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        this.store.dispatch(assignUserToTask({userId: data.id, taskId: taskId}));
        this.subscription$ = this.store.select(selectAssignedUserToTask).subscribe(data=>{
          if(data){
            this.store.dispatch(getTask());
          }
        })
      }
    });
    this.subscription$.unsubscribe();
  };
}
