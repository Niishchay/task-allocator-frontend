import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../model/user.model";
import { Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { RoleEnum } from "../enums/role.enum";

@Injectable({
    providedIn: "root"
})
export class LoginSignupService{

    loggedInUser: RoleEnum | undefined;
  
    constructor(private http: HttpClient, private snackBar: MatSnackBar){}

    // openSnackBar(message: any){
    //     this.snackBar.open(message);
    //     setTimeout(()=>{
    //         this.snackBar.dismiss();
    //     }, 3000)
    // }

    // errorHandler(error: any){
    //     if(typeof error.error === 'object'){
    //         let errorMessage: string[] = [];
    //         Object.values(error.error).forEach((data: any)=>{
    //             errorMessage.push(data);
    //         })
    //         this.openSnackBar(errorMessage.join(", "))
    //     }
    //     else{
    //         this.openSnackBar(error.error);
    //     }
    // }

    login(user: User): Observable<User>{
        const url = "http://localhost:3036/api/login"
        return this.http.post<User>(url, user);
    }
 }