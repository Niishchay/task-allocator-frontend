import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../model/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { loadAllUser } from '../state/app.action';
import { selectAllUser } from '../state/app.selector';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModalComponent implements OnInit {

  selectedUser!: User;
  users!: User[];

  constructor(private store: Store<{app: AppState}>, @Inject(MAT_DIALOG_DATA) public data: number, private dialogRef: MatDialogRef<PopupModalComponent>){}

  ngOnInit() {
    this.store.dispatch(loadAllUser());
    this.store.select(selectAllUser).pipe().subscribe(users=>{
      if(users && users.length > 0){
        this.users = users;
      }
    })
  } 

  capitalize(username: string){
    return username.charAt(0).toUpperCase() + username.slice(1);
  }
}
