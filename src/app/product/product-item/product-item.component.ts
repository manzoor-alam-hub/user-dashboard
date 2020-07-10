import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAddModel } from '../product.model';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/cart/cart.model';
import { ProductService } from '../product.service';
import { CartSupportingService } from 'src/app/cart/cart-supporting.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  public productData: ProductAddModel[] = [];


    public shoppingCart: Cart;

  constructor(private router:Router,private appSupportingService:  AppService, private tostre: ToastrService, private productService:ProductService, private cartSupportService: CartSupportingService ) {
    // this.shoppingCart = new Cart;
    //  const checkCart = JSON.parse(localStorage.getItem('cartItem'))
    //   checkCart ? this.shoppingCart = checkCart : this.shoppingCart.products = [];
   }  


  onNavigate(id){ 
    this.router.navigate(['/product-details',id]);
  }

  ngOnInit() {
    const product = this.productService.getProduct().subscribe(
      (data)=>{
         console.log(data);
         this.productData = data;
      }
   )
  }

  addToCart(id){
    let productDetail: ProductAddModel;
    this.productService.getProductDetailById(id).subscribe(
      (res: any)=>{
        productDetail = res;
        this.cartSupportService.addProductInCart(productDetail).then((success: any)=>{
          if(success && success.status === 200) {
            const cart = this.cartSupportService.getCart();
            this.appSupportingService.onProductCountUpdate(cart.products.length);
            this.tostre.success(success.message, 'Yehh!!!');
            this.router.navigate(['/cart']);
            }
          }).catch ((err) => {
            this.tostre.error(err.message, 'Sorry!!!');
        })
      }
    )
  }


}
