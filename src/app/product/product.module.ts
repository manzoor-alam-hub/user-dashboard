import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductService } from './product.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
    declarations: [
        ProductComponent,
        ProductItemComponent,
        ProductDetailsComponent,
        AddProductComponent,
        ProductListComponent,
        ProductEditComponent,
    ],
    imports:[RouterModule, CommonModule, FormsModule, SweetAlert2Module, ProductRoutingModule],
    providers: [ProductService]
})
export class ProductModule{

}