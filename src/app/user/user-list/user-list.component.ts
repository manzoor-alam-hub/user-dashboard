import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from 'src/app/registration-page/registration.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
     
    public userData: RegistrationModel[]= [];
   

  constructor( private router: Router, private route:ActivatedRoute) {
      this.userData = JSON.parse(localStorage.getItem('user'));
    
      
   }

   onEdit(index:number){
      this.router.navigate(['/user-update', index]);
   }
   switchEnable(){ 
      console.log(this.userData);
      if(this.userData && this.userData.length>0){
         localStorage.setItem('user', JSON.stringify(this.userData));
      }
   }

  ngOnInit() {
    
    
  }

}
