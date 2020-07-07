import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CatagoryModel } from '../category.model';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('navigateToSwal', {static: false}) private navigateToSwal: SwalComponent;
    categoryForm:any
    public categoryData: CatagoryModel[] = []
  constructor( private router: Router, private catService:CategoryService) {
    
   }

  addcategory(form: NgForm){
    this.categoryForm = form.value;
    const data = this.categoryForm;
    this.catService.addCategory(data);
    this.navigateToSwal.fire();
    form.reset();
      console.log(this.categoryForm)
  }

  ngOnInit() {
  }

  onCancle(){
    this.router.navigate(['/category']);
  }

}
