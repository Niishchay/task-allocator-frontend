import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginSignupService } from './service/login-signup.service';
import { RoleEnum } from './enums/role.enum';

export const userAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loginSignupService = inject(LoginSignupService);
  if(loginSignupService.loggedInUser === RoleEnum.ASSOCIATE){
    return true;
  }
  router.navigate(["login-signup"]);
  return false;
};

export const adminAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loginSignupService = inject(LoginSignupService);
  if(loginSignupService.loggedInUser === RoleEnum.LEAD){
    return true;
  }
  router.navigate(["login-signup"]);
  return false;
};


