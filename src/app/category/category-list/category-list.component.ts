import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CatagoryModel } from '../category.model';
import { CategoryService } from '../category.service';
import { ToastrService } from 'ngx-toastr';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  @ViewChild('deleteSwal', {static: false}) private deleteSwal: SwalComponent;

    public search: string;
      public isViewCategory: boolean;
      public categoryData: CatagoryModel[] = [];
      public obj:any;
  constructor(private router: Router, private catService:CategoryService,
    private toaster: ToastrService) { 
      this.isViewCategory = false;
  }

  ngOnInit() {
    const category = this.catService.getCategory().subscribe(
      (data)=>{
         console.log(data);
         this.categoryData = data;
      }
   )
  }

  onNavigate(){
    this.router.navigate(['/add-category']);
  }

  onEdit(categoryId){
      this.router.navigate(['/edit-category', categoryId]);
    
  }
  onView(categoryId){
      this.catService.getCategoryById(categoryId).subscribe((res)=>{
        this.obj = res;
        if(this.obj && this.obj.id){
          this.isViewCategory = true;
        }else{
          this.toaster.info('Category not found!!!');
        }
      });
  }
  onDelete(categoryId){
    this.deleteSwal.fire().then(
      (willDelete)=>{
        if(willDelete.value){
          this.catService.deleteCategory(categoryId); 
        }
      }
    )
  }
 
  onHide(){
    this.isViewCategory = false;
  }
}
