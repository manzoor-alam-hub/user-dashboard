import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from 'src/app/registration-page/registration.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
    public obj:any ;// RegistrationModel;
    private elementIndex:number;
    private userField: RegistrationModel[] = [];
  constructor(private route:ActivatedRoute, private router:Router) { }


  onUpdate(){
   console.log(this.obj)
    this.userField[this.elementIndex] = this.obj; 
    localStorage.setItem('user', JSON.stringify (this.userField));
    this.router.navigate(['/user'])
     
  }

  ngOnInit() {
    this.route.params.subscribe(
      (data:any)=>{
        if(data.id) {
          const elementInd = data.id;
          this.elementIndex = elementInd;
          this.userField = JSON.parse(localStorage.getItem('user'));
          if(this.userField && this.userField.length > 0 && this.userField[data.id]) {
            this.obj = this.userField[data.id];
            console.log(this.obj);
          }
        }
        
      }
    );
  }

}
