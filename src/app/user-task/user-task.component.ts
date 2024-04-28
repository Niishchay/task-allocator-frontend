import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { selectAssignedUserToTask, selectTaskById, selectUser } from '../state/app.selector';
import { Subscription, take } from 'rxjs';
import { assignUserToTask, getTask, getTaskById, updateTaskStatus } from '../state/app.action';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../model/Task.model';
import { TaskStatus } from '../enums/task-status.enum';
import { PopupModalComponent } from '../user-popup-modal/popup-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.scss']
})
export class UserTaskComponent {
  
  displayedColumns: string[] = ['id', 'title', 'priority', 'status', 'action'];
  dataSource: any;
  taskStatus = Object.values(TaskStatus);
  userId: number | undefined;
  subscription$!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<{app: AppState}>, private dialog: MatDialog){}

  ngOnInit() {
    this.store.select(selectUser).pipe(take(1)).subscribe(userData=>{
      this.userId = userData?.id;
    })
    this.store.dispatch(getTaskById({userId: this.userId}));
    this.store.select(selectTaskById).subscribe(data=>{
      const newData = data.map(mapData => {
        return {
          ...mapData,
          status: TaskStatus[<keyof typeof TaskStatus>mapData.status]
        }
      })
      this.dataSource = new MatTableDataSource<Task>(newData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  assignTask(taskId: number){
    const dialogRef = this.dialog.open(PopupModalComponent, { disableClose: true });
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        this.store.dispatch(assignUserToTask({userId: data.id, taskId: taskId}));
        this.subscription$ = this.store.select(selectAssignedUserToTask).subscribe(data=>{
          if(data){
            this.store.dispatch(getTaskById({userId: this.userId}));
          }
        })
      }
    });
    this.subscription$.unsubscribe();
  };

  changeStatus(event: any, id: number){
    const status = Object.keys(TaskStatus).filter(data=> TaskStatus[<keyof typeof TaskStatus>data] === event.value)[0];
    this.store.dispatch(updateTaskStatus({id: id, status: status}))
  }
}
