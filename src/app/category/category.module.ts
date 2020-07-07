import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategortyRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { FilterPipe } from '../filter.pipe';
import { CategoryService } from './category.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ShortenPipe } from '../shorten.pipe';

@NgModule({
    declarations: [
    CategoryComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    FilterPipe,
    ShortenPipe
    ],
    imports:[RouterModule, CommonModule,FormsModule, SweetAlert2Module,  CategortyRoutingModule],
    providers:[CategoryService]
})
export class CategoryModule{

}