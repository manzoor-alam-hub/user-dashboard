import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductAddModel } from '../product.model';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/cart/cart.model';
import { ProductService } from '../product.service';
import { CartSupportingService } from 'src/app/cart/cart-supporting.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  public productData: ProductAddModel[] = [];


    public shoppingCart: Cart;
    public qtyNumber=1;
  constructor(private router:Router, private tostre: ToastrService, private productService:ProductService, private cartSupportService: CartSupportingService ) {
    // this.productData = JSON.parse (localStorage.getItem('product'));
    this.shoppingCart = new Cart;
     const checkCart = JSON.parse(localStorage.getItem('cartItem'))
      checkCart ? this.shoppingCart = checkCart : this.shoppingCart.products = [];
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
        this.cartSupportService.addProductInCart(productDetail);
        this.router.navigate(['/cart']);
        

      }
      
    )
    // obj.Qty = this.qtyNumber;
    // if(obj.instock - obj.Qty >=0){
    //     obj.instock = (obj.instock-obj.Qty);
    //     localStorage.setItem('product', JSON.stringify(this.productData))
    //     this.shoppingCart.products.push(obj);
    //     this. calculateAndSaveCart();
    // }else {
    //   this.tostre.error(`only ${obj.instock} item remaining in stock!!!`, 'Sorry')
    // }
  }
 calculateAndSaveCart() {  
  //   this.shoppingCart.grandTotal = 0;
  //   this.shoppingCart.subTotal = 0;
  //   this.shoppingCart.products.forEach((item: any) => {
  //     let totalPrice = 0;
  //     if(item.discount > 1){
  //       totalPrice = item.offer *(item.Qty)
  
  //     }else{
  //       totalPrice = item.price * (item.Qty);
  //     } 
  //     this.shoppingCart.grandTotal += totalPrice;
  //     this.shoppingCart.subTotal += totalPrice;
  //   });
  //   localStorage.setItem('cartItem', JSON.stringify(this.shoppingCart));
  //   this.router.navigate(['/cart'])
  //   this.tostre.success('Item added to cart', 'Success')
  }

}
