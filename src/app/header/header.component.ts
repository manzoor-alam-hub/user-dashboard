import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    public isAuthenticated = false;
    public isAdmin = false;
    public productsInCart = 0
  constructor(private router:Router, private appService: AppService) { 
    // const isUserLogin = localStorage.getItem('isLogin');
    // if(!isUserLogin){
    //   this.router.navigate(['/login']);
    // }
    this.appService.isUserLogin.subscribe(
      (data)=>{
            // localStorage.getItem('isLogin');
            this.isAuthenticated = data;
            // console.log('appService.isUserLogin', data);
      }
    );
    this.appService.isAdminUser.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
      console.log('isAdmin in header', isAdmin);
    })
    this.appService.productCount.subscribe((count:number) => {
      this.productsInCart = count;
    })
   console.log('header ',this.isAuthenticated);
    
  }

  logout() {
    localStorage.removeItem('isLogin');
    this.appService.isLoginSuccess(false);
    localStorage.removeItem('logedInUser');
    this.router.navigate['/login'];
  }

  ontoggle(){
    this.appService.isOpenToggleBar();
  }
  ngOnInit() {
   
  }

}
