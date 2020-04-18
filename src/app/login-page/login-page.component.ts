import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationModel } from '../registration-page/registration.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
   signinForm: any = NgForm
   public userData: RegistrationModel[] =[]
  constructor(private router: Router ) {
    const checkData = JSON.parse (localStorage.getItem('user'));
    this.userData = checkData;
      console.log(checkData);
   }


  onSubmit(form:NgForm){
    this.signinForm = form.value
     const userFound = this.userData.find((data)=>{
         if(data.email === this.signinForm.email && data.password === this.signinForm.password){
           return data;
         }
     });
     if(userFound){
      this.router.navigate(['/home']);
       console.log('this email found')
     }else{
      console.log('email not register')
     }
   
  }
  ngOnInit() {
  }

}
