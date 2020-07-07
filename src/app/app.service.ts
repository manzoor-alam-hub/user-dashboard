import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService{
     private isSideBarOpen: boolean;
    private   isLogin =  new BehaviorSubject<boolean>(localStorage.getItem('isLogin') ? true : false);
            isUserLogin = this.isLogin.asObservable();
    private isOpen = new BehaviorSubject<boolean>(localStorage.getItem('isLogin') ? false : false);
            isOpenToggle = this.isOpen.asObservable();

     isLoginSuccess(isUserLogin:boolean){
        this.isLogin.next(isUserLogin);
        this.isSideBarOpen = true;
        this.isOpen.next(this.isSideBarOpen);
     }


      isOpenToggleBar(){
         this.isSideBarOpen = !this.isSideBarOpen;
         this.isOpen.next(this.isSideBarOpen);
      }     
}      