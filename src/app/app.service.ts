import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService{
     
    private   isLogin =  new BehaviorSubject<boolean>(localStorage.getItem('isLogin') ? true : false);
            isUserLogin = this.isLogin.asObservable();

     isLoginSuccess(isUserLogin:boolean){
        this.isLogin.next(isUserLogin);
     }

}      