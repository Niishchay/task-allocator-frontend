import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { loadUsers, requestTask } from '../state/app.action';
import { selectRequestTask, selectUser, selectUsers } from '../state/app.selector';
import { UserStatus } from '../enums/user-status.enum';
import { User } from '../model/user.model';
import { RequestTask } from '../model/request-task.model';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['id', 'username', 'role', 'status', 'requestStatus'];
  dataSource: any;
  userId!: number;
  sub$!: Subscription;
  subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getLeads(){
    this.store.dispatch(loadUsers({id: this.userId}));
    if(this.sub$){
      this.sub$.unsubscribe();
    }
  }

  constructor(private store: Store<{app: AppState}>){}

  ngOnInit() {
    this.subscriptions.push(this.store.select(selectUser).subscribe((data)=>{
      if(data){
        this.userId = data.id;
        this.getLeads();
      }
    }))
    this.subscriptions.push(this.store.select(selectUsers).subscribe(data=>{
      const newData = data.map(mapData => {
        return {
          ...mapData,
          username: this.capitalize(mapData.username),
          status: UserStatus[<keyof typeof UserStatus>mapData.status]
        }
      })
      this.dataSource = new MatTableDataSource<any>(newData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }))
  }

  applyFilter(event: any) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  capitalize(username: string){
    return username.charAt(0).toUpperCase() + username.slice(1);
  }

  requestTask(assigneeDetails: User){
    const requestTaskData: RequestTask = {
      requesterId: this.userId,
      assigneeId: assigneeDetails.id
    }
    this.store.dispatch(requestTask({payload: requestTaskData}));
    this.sub$ = this.store.select(selectRequestTask).subscribe(data=>{
      if(data){
        this.getLeads();
      }
    })
  }
    
  ngOnDestroy() {
    for(let subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }
}
