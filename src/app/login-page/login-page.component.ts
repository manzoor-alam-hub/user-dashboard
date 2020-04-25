import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { RegistrationModel } from '../registration-page/registration.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
   public userData: RegistrationModel[] =[]
   public signinForm: FormGroup;
   public submitted = false;

  constructor(private router: Router , private fb:FormBuilder, private toastr: ToastrService, private changeLoginState: AppService) {
    const isUserLogin = localStorage.getItem('isLogin');
     if(isUserLogin){
       this.router.navigate(['/home']);
     }
    const checkData = JSON.parse (localStorage.getItem('user'));
    this.userData = checkData;
      console.log(checkData);
   }

   get f(){
     return  this.signinForm.controls
   }

  onSubmit(){
    this.submitted =true;
     const userFound = this.userData.find((data)=>{
         if(data.email === this.signinForm.value.email && data.password === this.signinForm.value.password && data.enable == true){
           return data;
         }
     });
     if(userFound){
      this.router.navigate(['/home']);
       localStorage.setItem('isLogin', 'true');
       this.changeLoginState.isLoginSuccess(true);
       this.toastr.success(  'Login success')
     }else{
       this.toastr.warning('User block', 'message')
      console.log('email not register')
     }
     this.signinForm.reset();
   
  }
  ngOnInit() {
   this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['' ,Validators.required],
      checkbox: ['', Validators.required]
 });
  }

}
