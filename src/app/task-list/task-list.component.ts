import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectRequestTaskList, selectUndoRequestSuccess, selectUser } from '../state/app.selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { take } from 'rxjs';
import { getRequestTask, undoTaskRequest } from '../state/app.action';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'assigneeUsername', 'taskId', 'requestStatus','requestDate', 'action'];
  dataSource: any;
  userId: number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<{app: AppState}>){}

  ngOnInit() {
    this.store.select(selectUser).pipe(take(1)).subscribe(userData=>{
      this.userId = userData?.id;
    })
    this.store.dispatch(getRequestTask({id: this.userId}));
    this.store.select(selectRequestTaskList).subscribe(data=>{
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  removeTask(id: number){
    this.store.dispatch(undoTaskRequest({ taskRequestId: id}));
    this.store.select(selectUndoRequestSuccess).subscribe(data=>{
      if(data){
        this.store.dispatch(getRequestTask({id: this.userId}));
      }
    })
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
