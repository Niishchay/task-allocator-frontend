import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginSignupService } from '../service/login-signup.service';
import { RoleEnum } from '../enums/role.enum';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUser } from '../state/app.action';
import { AppState } from '../state/app.state';
import { selectUser } from '../state/app.selector';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {

  loginForm!: FormGroup; 

  constructor(private store: Store<{app: AppState}>, private fb: FormBuilder, private loginSignupService: LoginSignupService, private router: Router){
    this.loginForm = this.fb.group({
      username: ['nishchay', Validators.required],
      password: ['hello', Validators.required]
    })
  }

  submit(){
    if(this.loginForm.valid){
      this.store.dispatch(loadUser({user: this.loginForm.value}));
      this.store.select(selectUser).subscribe(data=>{
        if(data){
          if(data?.role === RoleEnum.LEAD){
            this.router.navigate(["admin"]);
          }
          else{
            this.router.navigate(["user"]);
          }
        }
      })
    }
  }

}
