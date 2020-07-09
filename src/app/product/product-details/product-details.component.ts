import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel, ProductAddModel, ProductInCart } from '../product.model';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/cart/cart.model';
import { ProductService } from '../product.service';
import { CartService } from 'src/app/cart/cart.service';
import { CartSupportingService } from 'src/app/cart/cart-supporting.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // public productIndex:number; 
  public obj:ProductAddModel = new ProductAddModel();
  public productData:ProductAddModel[] = [];
  public qtyNumber=1;
  public totalPrice:number;
  // public offerPrice: number;
  // public price:number
  public isfavorite:boolean;
  public shoppingCart: Cart;
  constructor(private route:ActivatedRoute, private router:Router, private tostre:ToastrService,
     private productService: ProductService, private cartService:CartService, private cartSupportingService:CartSupportingService) { 
      // this.shoppingCart = new Cart;
      // const checkCart = JSON.parse(localStorage.getItem('cartItem'))
      // checkCart ? this.shoppingCart = checkCart : this.shoppingCart.products = [];
      this.isfavorite = JSON.parse(localStorage.getItem('favorite'))
  }

  ngOnInit() {
    this.route.params.subscribe(
      (data)=>{
        if(data.id){
          const productId= data.id
          this.productService.getProductDetailById(productId).subscribe((res: any) => {
            if(res && res.id) {
              this.obj = res;
            } else {
              this.tostre.info('Product not found!!!');
            }
          });
          // this.productService.getProduct().subscribe(
          //   (data)=>{
          //     this.productData = data;
          //     if(this.productData && this.productData.length > 0){
          //       const productInd = this.productData.findIndex(productdata => productdata.id == productId);
          //       if(productInd > -1){
          //         this.productIndex = productInd;
          //         this.obj = this.productData[productInd];
          //         this.multilyItem();
          //       }else{
          //         this.tostre.info('This product not available');
          //         this.router.navigate(['product-item']);
          //       }
          //     }
          //   }
          // )
        }
      }
    );
  }

  addToCart(id){
    let productDetail:ProductAddModel;
    this.productService.getProductDetailById(id).subscribe(
      (res:any)=>{
        productDetail = res;
        this.cartSupportingService.addProductInCart(productDetail, this.qtyNumber).then((success: any)=>{
          if(success && success.status === 200) {
          this.tostre.success(success.message, 'Yehh!!!');
          this.router.navigate(['/cart']);
          }
        }).catch ((err) => {
          this.tostre.error(err.message, 'Sorry!!!');
        })
      }
    )

    // this.obj.Qty= this.qtyNumber;
    // this.obj.totalPrice= this.totalPrice;
    // this.obj.offerPrice = this.offerPrice
    // if((this.productData[this.productIndex].instock - this.qtyNumber) >= 0) { // 3 3 = 0
    //   this.productData[this.productIndex].instock = (this.productData[this.productIndex].instock - this.qtyNumber);//
    //   // this.productService.updateProduct(this.obj);
    //   localStorage.setItem('product', JSON.stringify(this.productData));
    //   this.shoppingCart.products.push(this.obj);
    //   this.calculateAndSaveCart();
     
    // } else {
    //   this.tostre.error(`only ${this.productData[this.productIndex].instock} item remaining in stock!!!`, 'Sorry')
    // }

    
  }

  calculateAndSaveCart() {  
    // this.shoppingCart.grandTotal = 0;
    // this.shoppingCart.subTotal = 0;
    // this.shoppingCart.products.forEach((item: any) => {
    //   let totalPrice = 0;
    //   if(item.discount > 1){
    //     totalPrice = item.offer *(item.Qty)
  
    //   }else{
    //     totalPrice = item.price * (item.Qty);
    //   } 
    //   this.shoppingCart.grandTotal += totalPrice;
    //   this.shoppingCart.subTotal += totalPrice;
    // });
    
    // // this.cartService.addToCart(this.shoppingCart)
    // localStorage.setItem('cartItem', JSON.stringify(this.shoppingCart));
    //   this.router.navigate(['/cart']);
    // this.tostre.success('Item added to cart', 'Success')
  }

  byNow(id){
    let productDetail:ProductAddModel;
    this.productService.getProductDetailById(id).subscribe(
      (res:any)=>{
        productDetail = res;
        this.cartSupportingService.addProductInCart(productDetail, this.qtyNumber).then((success: any)=>{
          if(success && success.status === 200) {
          this.tostre.success(success.message, 'Yehh!!!');
          this.router.navigate(['/checkout']);
          }
        }).catch ((err) => {
          this.tostre.error(err.message, 'Sorry!!!');
        })
      }
    )
  }

  multilyItem(){
    if(this.obj.discount > 1){
      this.totalPrice = this.obj.discountPrice *(this.qtyNumber)

    }else{
      this.totalPrice = this.obj.actualPrice * (this.qtyNumber);
    }
    

  }

  addedInCart(){
    
  }



  onfavourit(){
  this.isfavorite = !this.isfavorite
  localStorage.setItem('favorite', JSON.stringify(this.isfavorite))
}

}
