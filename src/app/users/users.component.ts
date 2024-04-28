import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { loadAllUser } from '../state/app.action';
import { selectAllUser } from '../state/app.selector';
import { UserStatus } from '../enums/user-status.enum';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'username', 'role', 'status'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getLeads(){
    this.store.dispatch(loadAllUser());
    this.store.select(selectAllUser).subscribe(data=>{
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
    })
  }

  constructor(private store: Store<{app: AppState}>){}

  ngOnInit() {
    this.getLeads();
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

}
