import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { adminAuthGuard, userAuthGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UsersComponent } from './users/users.component';
import { UserTaskComponent } from './user-task/user-task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'requested-task',
    component: TaskListComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'task-list',
    component: UserTaskComponent,
    canActivate: [userAuthGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'create-task',
    component: CreateTaskComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'login-signup',
    component: LoginSignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
