import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import { SignUpResponse, SignupData, LoginData,LoginResponse, User } from '../_models/user.model';
import { catchError, Subject, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  user = new Subject <User>();
  isLogin=false;
  changeLogin : EventEmitter<boolean> = new EventEmitter<boolean>();
  signup(user:SignupData){
    return this.http.post<SignUpResponse>('',
    {
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      password:user.password
    }).pipe(
      catchError(this.handleError)
    )
  }
  login(data:LoginData){
    return this.http.post<LoginResponse>('',
    {
      email:data.email,
      password:data.password
    }).pipe(catchError(this.handleError))
  }

  private handleError(err:HttpErrorResponse){
    let errMsg = 'An unknown error occurred!'
        if(!err.error ){
          return throwError(()=> new Error(errMsg));
        }
        switch(err.error){

          default:
            errMsg = 'An error occurred!'

        }
        return throwError(()=>new Error(errMsg))
  }

  checktoken(status:boolean){
    if(!status){
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('salt');
      localStorage.removeItem('user_info');
      this.changeLogin.emit(false);
      return;
    }
    if(localStorage.getItem("token")){
      this.isLogin=true;
      this.changeLogin.emit(true);
    }
  }

}
