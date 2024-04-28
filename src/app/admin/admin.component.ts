import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { selectAssignedTaskToUser, selectAssigneeTaskList, selectUser } from '../state/app.selector';
import { take } from 'rxjs';
import { assignTaskToUser, getAssigneeTask } from '../state/app.action';
import { MatTableDataSource } from '@angular/material/table';
import { RequestTask } from '../model/request-task.model';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../model/user.model';
import { TaskPopupModalComponent } from '../task-popup-modal/task-popup-modal.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  displayedColumns: string[] = ['id', 'requesterUsername', 'taskId', 'requestStatus', 'requestDate', 'action'];
  dataSource: any;
  userId: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  users!: User[];

  getAssigneeTaskList(){
    this.store.dispatch(getAssigneeTask({id: this.userId}));
  }

  constructor(private store: Store<{app: AppState}>, private dialog: MatDialog){}

  ngOnInit() {
    this.store.select(selectUser).pipe(take(1)).subscribe(data=>{
      this.userId = data?.id;
    })
    this.getAssigneeTaskList();
    this.store.select(selectAssigneeTaskList).subscribe(data=>{
      this.dataSource = new MatTableDataSource<RequestTask>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  AssignTask(userId: number){
    const dialogRef = this.dialog.open(TaskPopupModalComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        this.store.dispatch(assignTaskToUser({taskRequestId: userId, taskId: data.id}));
        this.store.select(selectAssignedTaskToUser).subscribe(data=>{
          if(data){
            this.getAssigneeTaskList();
          }
        })
      }
    }) 
  }

  capitalize(username: string){
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
}
