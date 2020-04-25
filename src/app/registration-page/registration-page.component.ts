import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationModel } from './registration.model';
import { format } from 'url';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

 public signUpForm:any ;   
 public userData:RegistrationModel[]= []; 
 public userFound;
 passwordMatched: boolean
  constructor(private toastr: ToastrService, private router: Router) { 
    const checkData = JSON.parse(localStorage.getItem('user'));
    checkData ? this.userData = checkData : this.userData = [];
    console.log(checkData);
  }

  onSubmit(form:NgForm){
    this.signUpForm = form.value;
      this.signUpForm.role = 'user';
      this.signUpForm.enable = true;
      console.log(this.signUpForm);
       this.userFound =  this.userData.find((data)=>{
        if(data.email == this.signUpForm.email){
          return data;
        }
      });
   if(!this.userFound){
    this.userData.push(this.signUpForm);
    localStorage.setItem('user', JSON.stringify(this.userData))
    this.router.navigate(['/login'])
    this.toastr.success('Registration success please login', 'message')
    
    console.log(this.userData)
   }else{
     this.toastr.info('User already register', 'message')
     console.log('user exits');
   }
  
  }
  checkPassword(confirmPassword, Password){
    // console.log(confirmPassword.name + confirmPassword.viewModel);
    (confirmPassword.viewModel === Password.viewModel )? this.passwordMatched = true: this.passwordMatched = false;
    // console.log(Password.name + Password.viewModel)
  }
  

  ngOnInit() {
  }

}
