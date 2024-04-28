import { Component, OnInit } from '@angular/core';
import { LoginSignupService } from '../service/login-signup.service';
import { Router } from '@angular/router';
import { UserStatus } from '../enums/user-status.enum';
import { UserService } from '../service/user.service';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectUser } from '../state/app.selector';
import { logoutUser, updateStatus } from '../state/app.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userStatus = Object.values(UserStatus)

  username: string | undefined;
  status: UserStatus | undefined;
  id: number | undefined;

  constructor(private store: Store<{app: AppState}>, private loginSignupService: LoginSignupService, private userService: UserService, private router: Router){}

  ngOnInit() {
    this.store.select(selectUser).subscribe(data=> {
      if(data?.role === "LEAD"){
        this.userStatus = this.userStatus.filter(data => data === "AVAILABLE" || data === "ON LEAVE");
      }
      else{
        this.userStatus = Object.values(UserStatus)
      }
      this.username = data?.username
      this.status = UserStatus[<keyof typeof UserStatus>data?.status];
      this.id = data?.id;
      this.loginSignupService.loggedInUser = data?.role;
    });
  }

  onChange(event: any){
    const status = Object.keys(UserStatus).filter(keys => UserStatus[<keyof typeof UserStatus>keys] === event.value)[0];
    this.store.dispatch(updateStatus({id: this.id, status: status}));
  }

  capitalize(username: string){
    return username.charAt(0).toUpperCase() + username.slice(1);
  }

  logout(){
    this.store.dispatch(logoutUser());
    this.router.navigate(["login-signup"]);
  }
}
