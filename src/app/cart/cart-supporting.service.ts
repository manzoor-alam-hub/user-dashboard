import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable(
    {
        providedIn:'root'
    }
)
export class CartSupportingService{
    constructor(private toaster: ToastrService) {

    }
    isProductInStock(productId) {}
    isProductAlredyInCart(productId) {
        return new Promise( (resolve, reject) =>  {
            const cart = this.getCart();
            if(cart && cart.products && cart.products.length > -1) {
                if(cart.products.length > 0) {
                    const isItemFound = cart.products.find((item) => {
                        if(item.id === productId) {
                            return item;
                        }
                    });
                    if(isItemFound) {
                        resolve({status : 400, message : 'Item Already present in Cart'});
                    } else {
                        resolve({status : 200, message : 'Item not present in Cart'});
                    }
                } else {
                    resolve({status : 200, message : 'Item not present in Cart'});
                }
            } else {
                reject({status : 500, message : 'Cart not available'});
            }
        });
    }

    incrmentProductQuentity(productId) {
        return new Promise((resolve, reject)=>{
            const cart = this.getCart();
            if(cart.products.length > 0){
                const itemFound = cart.products.findIndex((item)=>{
                    if(item.id === productId){
                        item.qty++
                        return item; 
                    }
                });
                if(itemFound > -1){
                    this.cartCalculation(cart).then((calculation)=>{
                        if(calculation){
                            this.updateCart(cart).then((success:any)=>{
                                if(success && success.status === 200) {
                                    resolve({status : 200, message : 'Product removed cart successfully'});
                                }
                            })
                        }
                    })
                }
            }


        })
       


    }
    decrementProductQuantity(productId) {
        return new Promise((resolve, reject)=>{
            const cart = this.getCart();
            if(cart.products.length > 0){
                const itemFound = cart.products.findIndex((item)=>{
                    if(item.id === productId){
                        item.qty--
                        return item; 
                    }
                });
                if(itemFound > -1){
                    this.cartCalculation(cart).then((calculation)=>{
                        if(calculation){
                            this.updateCart(cart).then((success:any)=>{
                                if(success && success.status === 200) {
                                    resolve({status : 200, message : 'Product removed cart successfully'});
                                }
                            })
                        }
                    })
                }
            }


        })
    }
    removeProductFromCart(productId) {
        return new Promise((resolve, reject) => {
            const cart = this.getCart();
            if(cart.products.length > 0) {
                const isItemFoundAt = cart.products.findIndex((item) => {
                    if(item.id === productId) {
                        return item;
                    }
                });
                if(isItemFoundAt > -1) {
                    cart.products.splice(isItemFoundAt,1);
                    this.cartCalculation(cart).then((calculatioDone) => {
                        if(calculatioDone) {
                            this.updateCart(cart).then((success: any) => {
                                if(success && success.status === 200) {
                                    resolve({status : 200, message : 'Product removed cart successfully'});
                                }
                            })
                        }
                    })
                } else {
                    resolve({status : 400, message : 'Product not present in cart'});
                }
            } else {
                resolve({status : 400, message : 'No Product available in cart'});
            }
        })
    }
    
    addProductInCart(productDetail, quantity = 1){
        this.isProductAlredyInCart(productDetail.id).then((addToCart: any)=> {
            if(addToCart.status && addToCart.status === 200) {
                const cart = this.getCart();
                const product = {... productDetail};
                if(cart && cart.products && (cart.products.length > -1)) {
                    if(product && product.instock) {
                        delete product.instock;
                    }
                    product.qty = quantity;
                    cart.products.push(product);
                    this.cartCalculation(cart).then((calculatioDone) => {
                        if(calculatioDone) {
                            this.updateCart(cart).then((success: any) => {
                                if(success && success.status === 200) {
                                    this.toaster.info('Item added to cart');
                                }
                            })
                        }
                    })
                }
            }
        })
    }
    createCart(){

    }
    getCart(){
        const emptyCart: any  = {
            deliveryCharges: 0,
            products:[],
            grandTotal: 0,
            subTotal: 0
        }
        const cart = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : emptyCart;
        return cart;
    }
    updateCart(cartObject){
        return new Promise((resolve, reject) => {
            /**
            * Write logic related to calculatio and return updated cartObject
            */
            localStorage.setItem('cartItem', JSON.stringify(cartObject));
            resolve({status : 200, message : 'Item not present in Cart'});
        });
    }
    deleteCart(){}
    cartCalculation(cartObject) {
        return new Promise((resolve, reject) => {
            console.log(cartObject);
            if(cartObject && cartObject.products && cartObject.products.length > 0) {
                cartObject.subTotal = 0;
                cartObject.products.forEach((element: any) => {
                    element.totalPrice = element.discountPrice * element.qty;
                    cartObject.subTotal += element.discountPrice;
                });
                cartObject.grandTotal = cartObject.subTotal + cartObject.deliveryCharges;
            }
            /**
            * Write logic related to calculatio and return updated cartObject
            */
           resolve(cartObject);
        });
    }

    findItemInCart(productId){
        return new Promise((resolve, reject)=>{
            const cart = this.getCart();
            const findItem = cart.products.findIndex((item)=>{
                if(item.id === productId){
                    return item;
                }
                
            })
        })
       
    }
}