import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AdminComponent } from './admin/admin.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { appReducer } from './state/app.reducer';
import { appEffects } from './state/app.effects';
import { TaskListComponent } from './task-list/task-list.component';
import { UsersComponent } from './users/users.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { PopupModalComponent } from './user-popup-modal/popup-modal.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskPopupModalComponent } from './task-popup-modal/task-popup-modal.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginSignupComponent,
    UserComponent,
    AdminComponent,
    TaskListComponent,
    UsersComponent,
    CreateTaskComponent,
    PopupModalComponent,
    TaskModalComponent,
    TaskPopupModalComponent,
    UserTaskComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({app: appReducer}),
    StoreDevtoolsModule.instrument({ logOnly: !isDevMode() }),
    EffectsModule.forRoot([appEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
