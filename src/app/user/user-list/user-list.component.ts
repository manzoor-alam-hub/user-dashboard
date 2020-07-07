import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from 'src/app/registration-page/registration.model';
import { Router } from '@angular/router';
import { Authservice } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
     
    public userData: RegistrationModel[]= [];
   

  constructor( private router: Router, private authService:Authservice) {
      
   }

   onEdit(userId){
      this.router.navigate(['/user-update',userId]);
   }
   switchEnable(index:number){ 
      console.log(this.userData);
      const obj = this.userData[index];
      this.authService.updateUserdata(obj);
      // if(this.userData && this.userData.length>0){
      //    localStorage.setItem('user', JSON.stringify(this.userData));
      // }
   }

  ngOnInit() {
      const usr = this.authService.getUserdata().subscribe(
         (data)=>{
            console.log(data);
            this.userData = data;
         }
      )
    
  }

}
