import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{

isSideBarOpen: boolean;
isLogin: boolean;
  constructor(private appService: AppService){
  }
ngOnInit(){
  
  this.appService.isUserLogin.subscribe(
    (data)=>{
          this.isLogin = data;
    }
  );
  this.appService.isOpenToggle.subscribe(
    (data)=>{
      
          this.isSideBarOpen = data;
    }
  );
}



}
