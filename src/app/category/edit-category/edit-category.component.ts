import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CatagoryModel } from '../category.model';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
    public obj:CatagoryModel = new CatagoryModel();
    public categoryData:CatagoryModel[]= [];
  constructor( private router:Router, private route: ActivatedRoute, 
    private catService:CategoryService, private  toaster: ToastrService ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (data)=>{
        if(data.id){
          const categoryId = data.id;
          this.catService.getCategoryById(categoryId).subscribe((res: any)=>{
              if(res && res.id){
                this.obj = res;
              }else{
                this.toaster.info('Category not found!!!');
                this.onCancle();
              }
            } );
        } 
      }
    );
  }

  onUpdate(){
    this.catService.updateCategory(this.obj);
    this.router.navigate(['/category']);
  }

  onCancle(){
    this.router.navigate(['/category']);
  }
}
