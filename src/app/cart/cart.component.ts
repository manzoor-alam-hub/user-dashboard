import { Component, OnInit } from '@angular/core';
import { ProductModel, ProductAddModel, ProductInCart } from '../product/product.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cart } from './cart.model';
import { OrdersModel } from '../orders/orders.model';
import { CartService } from './cart.service';
import { CartSupportingService } from './cart-supporting.service';
import { ProductService } from '../product/product.service';
import { AppService } from '../app.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public shoppingCart: Cart;
  public orderData: OrdersModel;
  public isPickUp : boolean;
  public isDelivery:boolean;
  public deliverCharges:number;

  constructor(private tostre:ToastrService, private appSupportingService:  AppService, private router: Router, private cartSerive:CartService,
     private cartSupportingService: CartSupportingService, private productService:ProductService) {
    this.isDelivery = false;
    this.shoppingCart = this.cartSupportingService.getCart();
    if(this.shoppingCart && this.shoppingCart.deliveryCharges && this.shoppingCart.deliveryCharges > 0) {
      this.isDelivery = true;
    }  
    this.orderData = new OrdersModel;
      const checkOrder = JSON.parse(localStorage.getItem('orderItem'));
      checkOrder ? this.orderData = checkOrder : this.orderData.orderDetails = [];

   }

  ngOnInit() {
    // const cartData= this.cartSerive.getCartItem().subscribe(
    //   (data:any)=>{
    //     console.log(data);
    //     this.shoppingCart = data;
    //   }
    // )

  }
  increaseQty(productId, quantityInCart ){ // quantityInCart = current quantity of product added in cart
     let productDetail:ProductInCart
     this.productService.getProductDetailById(productId).subscribe(
       (item:any)=>{
        productDetail = item;
        const isQtyAvailable = this.cartSupportingService.isProductInStock(productDetail, quantityInCart).then(
          (response: any)=>{
            if(response && response.status === 200){
              this.cartSupportingService.incrmentProductQuentity(productId).then((incResponse: any) => {
                if(incResponse && incResponse.message) {
                  this.shoppingCart = this.cartSupportingService.getCart();
                }
              });
            }
          }
        ).catch((err) => {
          this.tostre.error(err.message, 'Sorry!!!');
        })
       }
     )
    
  }
 
  decreaseQty(productId){
    this.cartSupportingService.decrementProductQuantity(productId).then((response: any) => {
      if(response && response.message) {
        this.shoppingCart = this.cartSupportingService.getCart();
    
      }
    });
  
  }

  deleteItem(productId){
    let productDetail:ProductAddModel;
    this.productService.getProductDetailById(productId).subscribe(
      (res:any)=>{
        productDetail = res
      }
    )
    this.cartSupportingService.removeProductFromCart(productId).then((response: any) => {
      if(response && response.message) {
        this.shoppingCart = this.cartSupportingService.getCart();
        this.appSupportingService.onProductCountUpdate(this.shoppingCart.products.length);
        this.tostre.success(response.message, 'Cart');
      }
    });
     
  }

  updateToStorage() {
    // this.shoppingCart.subTotal = 0;
    // this.shoppingCart.grandTotal = 0;
    // this.shoppingCart.products.forEach((product: ProductModel) => {
    //   this.shoppingCart.subTotal += product.offerPrice;
    //   this.shoppingCart.grandTotal += product.offerPrice;
    // });
    // localStorage.setItem('cartItem', JSON.stringify(this.shoppingCart));
  }
  
  checkout() {
    this.router.navigate(['/checkout']);
    // this.updateToStorage();
    // if(this.isDelivery){
    //   this.deliverCharges = 30;
    //   this.shoppingCart.grandTotal += this.shoppingCart.deliveryCharges;
    //   localStorage.setItem('cartItem', JSON.stringify(this.shoppingCart));
    //   this.orderData.deliveryDetails = {
    //     isPickUp : this.isPickUp,
    //     deliveryCharges: this.deliverCharges
    //   }
    //   this.orderData.orderDetails.push(this.shoppingCart);
    //   localStorage.setItem('orderItem', JSON.stringify(this.orderData));
    // }else{
    //  this.isPickUp = true;
    //  this.deliverCharges = 0;
    //  console.log('isPickUp',this.isPickUp);
    //    this.orderData.deliveryDetails = {
    //    isPickUp : this.isPickUp,
    //    deliveryCharges: this.deliverCharges
    //  }
    //  this.orderData.deliveryDetails.isPickUp=this.isPickUp;

    //  this.orderData.orderDetails.push(this.shoppingCart);
    //  localStorage.setItem('orderItem', JSON.stringify(this.orderData));
    //   console.log(this.orderData);
    //  }
 
    this.router.navigate(['/checkout']);
  }

  navigateToCart(){
    this.router.navigate(['/product-item']);
  } 

  onDeliveryChange(val) {
    this.cartSupportingService.onChangeDeliveryOption(val).then((res: any)=> {
      if(res.status) {
        this.shoppingCart = this.cartSupportingService.getCart();
        // this.shoppingCart.deliveryOption = val ? 'Delivery' : 'Pickup';
        this.isDelivery = val;
      }
    })
  }
  
}
