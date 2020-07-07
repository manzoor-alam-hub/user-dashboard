import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationModel } from './registration.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Authservice } from '../auth/auth.service';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

 public signUpForm:any ;   
 public userData:RegistrationModel[] = []; 
 passwordMatched: boolean
  constructor(private toastr: ToastrService, private router: Router,
    private authService:Authservice) { 
  }

  onSubmit(form:NgForm){
    this.signUpForm = form.value;
      const email = form.value.email;
      const password = form.value.password;
      this.signUpForm.role = 'user';
      this.signUpForm.enable = true;
      this.authService.signUp(email, password).then(
        (res)=>{
          if(res.user.email){
            let data = this.signUpForm;
            if(data && data.password) {
              delete data.password;
            }
            if(data && data.confirmPassword) {
              delete data.confirmPassword;
            }
            this.authService.createUserdata(data);
            this.router.navigate(['/login']);
            this.toastr.success('Registration success please login', 'message');
          }
          
        }
      ).catch((error)=>{
        console.log('error ', error.message);
        this.toastr.info( error.message, 'error message')
      })
  }
  checkPassword(confirmPassword, Password){
    (confirmPassword.viewModel === Password.viewModel )? this.passwordMatched = true: this.passwordMatched = false;
  }
  

  ngOnInit() {    
         
  }

}
