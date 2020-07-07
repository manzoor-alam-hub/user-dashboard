import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductAddModel } from '../product.model';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild('deleteSwal', {static: false}) private deleteSwal: SwalComponent;
    public isViewProduct:boolean;
    public productData: ProductAddModel[] = [];
    public obj:ProductAddModel = new ProductAddModel();
    constructor(private router:Router, private productService:ProductService, private toaster: ToastrService) { 
    this.isViewProduct = false
  }


  onNavigate(){

  }

  onEdit(id){
    this.router.navigate(['/product-edit',id]);
  }
  ngOnInit() {
    const product = this.productService.getProduct().subscribe(
      (data)=>{
         console.log(data);
         this.productData = data;
         
      }
   )
  }
  onView(productId){
    this.productService.getProductDetailById(productId).subscribe((res: any) => {
      this.obj = res;
      if (this.obj && this.obj.id) {
        this.isViewProduct = true;
      } else {
        this.toaster.info('Product not found!!!');
      }
    });


}

  onDelete(productId){
    this.deleteSwal.fire().then(
      (willDelete)=>{
        if(willDelete.value){
          this.productService.deleteProdcut(productId);
        }
      }
    )
    


  }

  onHide(){
    this.isViewProduct= false;
  }
}
