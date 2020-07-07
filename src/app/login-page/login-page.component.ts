import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { RegistrationModel } from '../registration-page/registration.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { Authservice} from '../auth/auth.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
   public userData: RegistrationModel;
   public signinForm: FormGroup;
   public submitted = false;

  constructor(private router: Router , private fb:FormBuilder, private toastr: ToastrService, 
    private changeLoginState: AppService, private authService:Authservice ) {
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
        const email = this.signinForm.value.email;
        const password = this.signinForm.value.password;

        this.authService.login(email, password).then(
          (res:any)=>{
            console.log(res);
            this.userData = res;
            this.router.navigate(['/home']);
            localStorage.setItem('isLogin', 'true');
            this.changeLoginState.isLoginSuccess(true);
            localStorage.setItem('logedInUser', JSON.stringify(res));
            this.toastr.success(  'Login successful !', 'Success')
            this.signinForm.reset();

          }
        ).catch((err)=>{
            console.log('error', err);
            this.toastr.error(err.code, 'Invalid user')
        })

       
          //  this.authService.login(email, password).then(
          //    (data: any)=>{
               
          //    console.log(data);
          //       this.userData = data;
          //       this.router.navigate(['/home']);
          //     localStorage.setItem('isLogin', 'true');
          //      this.changeLoginState.isLoginSuccess(true);
          //      localStorage.setItem('logedInUser', JSON.stringify(data));
          //       this.toastr.success(  'Login successful !', 'Success')
          //       this.signinForm.reset();
          //    }
          //  ).catch((err) => {
          //   this.toastr.error(err.error.error.message, 'Invalid user')
          //   console.log(err);
          //  })
    
    //  if(userFound){
    //   this.router.navigate(['/home']);
    //    localStorage.setItem('isLogin', 'true');
    //    this.changeLoginState.isLoginSuccess(true);
    //    delete userFound.password;
    //    delete userFound.confirmPassword;
    //    delete userFound.acceptTerms;
    //    localStorage.setItem('logedInUser', JSON.stringify(userFound));
    //    this.toastr.success(  'Login successful !', 'Success')
    //  }else{
    //    this.toastr.warning('User block', 'message')
    //   console.log('email not register')
    //  }
   
  }
  ngOnInit() {
   this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['' ,Validators.required],
      checkbox: ['']
 }); 
     

  }

}
