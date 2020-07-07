import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAddModel } from '../product.model';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

    public obj:ProductAddModel = new ProductAddModel();
    public productData:ProductAddModel[] = []
    public productIndex:number
  constructor(private route:ActivatedRoute,
              private router:Router,
              private toaster: ToastrService,
              private productService:ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (data)=>{
        if(data.id){
          const productId = data.id;
          this.productService.getProductDetailById(productId).subscribe((res: any) => {
            if(res && res.id) {
              this.obj = res;
            } else {
              this.toaster.info('Product not found!!!');
              this.onCancle();
            }
          });
        }
      }
    );
  }

  onUpdate(){
    this.productService.updateProduct(this.obj);
    this.router.navigate(['/product-list']);
  }

  onCancle(){
    this.router.navigate(['/product-list'])
  }
  offerPrice(){
    if(this.obj.actualPrice && this.obj.discount){
      console.log('price')
      this.obj.discountPrice = this.obj.actualPrice - ((this.obj.actualPrice*this.obj.discount)/100)

    }
  }
}
