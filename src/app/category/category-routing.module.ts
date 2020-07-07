import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';


const routes: Routes = [
 {path: 'category', component: CategoryListComponent},
  {path:'add-category',component: AddCategoryComponent},
  {path: 'edit-category/:id', component: EditCategoryComponent},
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategortyRoutingModule{
    
}