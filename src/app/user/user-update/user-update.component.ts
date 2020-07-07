import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from 'src/app/registration-page/registration.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Authservice } from 'src/app/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
    public obj:RegistrationModel = new RegistrationModel();
    private userField: RegistrationModel[] = [];
  constructor(private route:ActivatedRoute, private router:Router,
     private authService:Authservice, private toastre:ToastrService) { }


  onUpdate(){
    this.authService.updateUserdata(this.obj);
    this.router.navigate(['/user'])
     
  }

  ngOnInit() {
    this.route.params.subscribe(
      (data)=>{
        if(data.id) {
          const userId = data.id;
          this.authService.getUserdataById(userId).subscribe((res:any)=>{
            if(res && res.id){
              this.obj = res;
            }else{
              this.toastre.info('User not found !!')
            }
          }); 
        }
        
      });
  }

}
