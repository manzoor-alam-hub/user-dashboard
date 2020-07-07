import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
    {path: 'product', component: AddProductComponent},
    {path: 'product-list', component:ProductListComponent},
    {path: 'product-edit/:id',component:ProductEditComponent},
    {path: 'product-item', component: ProductItemComponent},
    {path: 'product-details/:id', component:ProductDetailsComponent},
]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports: [RouterModule]

})
export class ProductRoutingModule{

}