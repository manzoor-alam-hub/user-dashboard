import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistrationModel } from './registration.model';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

 public signUpForm:any=NgForm ;   
 public userData:RegistrationModel[]= []; 
  constructor() { 
    const checkData = JSON.parse(localStorage.getItem('user'));
    this.userData = checkData
    console.log(this.userData);
  }

  onSubmit(form:NgForm){
    this.signUpForm = form.value;
     const userFound =  this.userData.find((data)=>{
     if(data.email == this.signUpForm.email){
       return data;
     }
   });
   if(!userFound){
    this.userData.push(this.signUpForm);
    localStorage.setItem('user', JSON.stringify(this.userData))
    console.log(this.userData)
   }else{
     console.log('user exits');
   }
   form.reset(); 
  }

  ngOnInit() {
  }

}
