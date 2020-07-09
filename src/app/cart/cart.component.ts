import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product/product.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Cart } from './cart.model';
import { OrdersModel } from '../orders/orders.model';
import { CartService } from './cart.service';
import { CartSupportingService } from './cart-supporting.service';


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

  constructor(private tostre:ToastrService, private router: Router, private cartSerive:CartService, private cartSupportingService: CartSupportingService) {
    // this.shoppingCart = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : new Cart();
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
  increaseQty(productId){
    this.cartSupportingService.incrmentProductQuentity(productId).then((response: any) => {
      if(response && response.message) {
        this.shoppingCart = this.cartSupportingService.getCart();
      }
    });
    
    //  const obj = this.shoppingCart.products[index];
    //  const isQtyAvailable = this.checkQuentityOfProduct(obj.productId, obj.Qty);
    //  console.log(isQtyAvailable);
    //  if(isQtyAvailable){
    //   obj.Qty++;
    //   obj.instock--;
    //   if(obj.discount > 1){
    //     obj.offerPrice = obj.offer *obj.Qty;
    //   }else{
    //     obj.totalPrice = obj.price * obj.Qty;
    //   }
    //   this.updateToStorage(); 
    //  }
    // ;
   
  }
  // checkQuentityOfProduct(productId, pickedQuentity) {
  //   // const allProducts = localStorage.getItem('product');
  //   // if(allProducts) {
  //   //   const productArr: any [] = JSON.parse(allProducts);
  //   //   const productData = productArr.find((data: any) => data.productId === productId);
  //   //   if (productData) {
  //   //     if(pickedQuentity < productData.instock) {
  //   //       productData.Qty = (productData.instock - pickedQuentity);
  //   //       return true;
  //   //     } else {
  //   //       this.tostre.error(`only ${productData.instock} item remaining in stock!!!`, 'Sorry');
  //   //       return false;
  //   //     }
  //   //   } else {
  //   //     this.tostre.error(`Product not available!!!`, 'Sorry');
  //   //     return false;
  //   //   }
  //   // }

  // }
  decreaseQty(productId){
    this.cartSupportingService.decrementProductQuantity(productId).then((response: any) => {
      if(response && response.message) {
        this.shoppingCart = this.cartSupportingService.getCart();
    
      }
    });
    // const obj = this.shoppingCart.products[index];
    // console.log(obj.Qty);
    // if(obj.Qty >1){
    //   obj.Qty--;
    //   obj.instock++;
    //   if(obj.discount > 1){
    //       obj.offerPrice = obj.offer *obj.Qty;
    
    //     }else{
    //       obj.totalPrice = obj.price * obj.Qty;
    //     }
      
    //   this.updateToStorage();
      
    // }

  }

  deleteItem(productId){
    this.cartSupportingService.removeProductFromCart(productId).then((response: any) => {
      if(response && response.message) {
        this.shoppingCart = this.cartSupportingService.getCart();
        this.tostre.success(response.message, 'Cart');
      }
    });
      //  const obj= this.shoppingCart.products[index]
      //  console.log(obj);
      //  let productArr: any[] = JSON.parse(localStorage.getItem('product'));
      //  console.log(productArr);
      //  const productdataInd = productArr.findIndex((data: any)=>  data.productId === obj.productId );
      //  const updateInstock = (+obj.Qty + productArr[productdataInd].instock);
      //  productArr[productdataInd].instock = updateInstock
      //  console.log(productArr[productdataInd].instock);
      //  localStorage.setItem('product', JSON.stringify(productArr));
      // this.shoppingCart.products.splice(index, 1);
      // this.updateToStorage();
      // this.tostre.info('Item removed from cart', 'Success')
     
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
    this.updateToStorage();
    if(this.isDelivery){
      this.deliverCharges = 30;
      this.shoppingCart.grandTotal += this.shoppingCart.deliveryCharges;
      localStorage.setItem('cartItem', JSON.stringify(this.shoppingCart));
      this.orderData.deliveryDetails = {
        isPickUp : this.isPickUp,
        deliveryCharges: this.deliverCharges
      }
      this.orderData.orderDetails.push(this.shoppingCart);
      localStorage.setItem('orderItem', JSON.stringify(this.orderData));
    }else{
     this.isPickUp = true;
     this.deliverCharges = 0;
     console.log('isPickUp',this.isPickUp);
       this.orderData.deliveryDetails = {
       isPickUp : this.isPickUp,
       deliveryCharges: this.deliverCharges
     }
     this.orderData.deliveryDetails.isPickUp=this.isPickUp;

     this.orderData.orderDetails.push(this.shoppingCart);
     localStorage.setItem('orderItem', JSON.stringify(this.orderData));
      console.log(this.orderData);
     }
 
    this.router.navigate(['/checkout']);
  }

  navigateToCart(){
    this.router.navigate(['/product-item']);
  } 

  onDeliveryChange(val) {
    this.cartSupportingService.onChangeDeliveryOption(val).then((res: any)=> {
      if(res.status) {
        this.shoppingCart = this.cartSupportingService.getCart();
        this.isDelivery = val;
      }
    })
  }
  
}
