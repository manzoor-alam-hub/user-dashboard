import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Authservice } from './auth/auth.service';

@Injectable()
export class AppService{
   private isSideBarOpen: boolean;
    private   isLogin =  new BehaviorSubject<boolean>(localStorage.getItem('isLogin') ? true : false);
            isUserLogin = this.isLogin.asObservable();
    private isOpen = new BehaviorSubject<boolean>(localStorage.getItem('isLogin') ? false : false);
            isOpenToggle = this.isOpen.asObservable();
   private isAdminKeyPresent = localStorage.getItem('logedInUser') ? JSON.parse(localStorage.getItem('logedInUser')) : false
   private isAdmin = new BehaviorSubject<boolean>((this.isAdminKeyPresent && this.isAdminKeyPresent.isAdmin) ? true : false);
         isAdminUser = this.isAdmin.asObservable();

   constructor(private authService:Authservice ){}
    

     isLoginSuccess(isUserLogin:boolean){
        this.isLogin.next(isUserLogin);
        this.isSideBarOpen = true;
        this.isOpen.next(this.isSideBarOpen);
     }


      isOpenToggleBar(){
         this.isSideBarOpen = !this.isSideBarOpen;
         this.isOpen.next(this.isSideBarOpen);
      }  
      
      isAdmintrue(isAdminUser:boolean){
         this.isAdmin.next(isAdminUser);
      }
}      