import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductModel, ProductAddModel } from '../product.model';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
    @ViewChild('navigateToSwal', {static: false}) private navigateToSwal: SwalComponent;
    productForm:any
    public productData:ProductAddModel[]=[];
    public newProduct: ProductAddModel;
    public productPrice:number;
    public discount:number;
    public discountPrice:number   
  constructor( private router: Router, private productService:ProductService) { 
    this.newProduct = new ProductAddModel();
  }


  addProduct(form:NgForm){
      // this.productForm = form.value;
      // console.log(this.newProduct);
      const data = {... this.newProduct};
      this.productService.addProduct(data);
      this.newProduct = new ProductAddModel();
      this.navigateToSwal.fire();
  }
  ngOnInit() {
  }

  navigateToList() {
    this.router.navigate(['/product-list']);
  }
  offerCalculation(){
    if(this.newProduct.actualPrice && this.newProduct.discount){
      console.log('price')
      this.newProduct.discountPrice = this.newProduct.actualPrice - ((this.newProduct.actualPrice*this.newProduct.discount)/100)
    } 
  }
}
