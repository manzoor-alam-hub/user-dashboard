import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CatagoryModel } from '../category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
    
    categoryForm:NgForm
    public categoryData: CatagoryModel[] = []
  constructor() {
  
   }

  addcategory(form: NgForm){
    this.categoryForm = form.value;

      console.log(this.categoryForm)
  }

  ngOnInit() {
  }

}
