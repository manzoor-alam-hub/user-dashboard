import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { resolve } from 'url';

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
                            this.updateCart(calculation).then((success:any)=>{
                                if(success && success.status === 200) {
                                    resolve({status : 200, message : 'Quantity increase from cart successfully'});
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
                            this.updateCart(calculation).then((success:any)=>{
                                if(success && success.status === 200) {
                                    resolve({status : 200, message : 'Quantity decrease from cart successfully'});
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
                            this.updateCart(calculatioDone).then((success: any) => {
                                if(success && success.status === 200) {
                                        resolve({status : 200, message : 'Product removed from cart successfully'});
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
    
    onChangeDeliveryOption(isDelivery, deliveryCharges = 30) {
        return new Promise((resolve, reject) => {
            const cart = this.getCart();
            isDelivery ? cart.deliveryCharges = deliveryCharges : cart.deliveryCharges = 0;
            this.cartCalculation(cart).then((updatedCart) => {
                this.updateCart(updatedCart).then((updateSuceess) => {
                    if(updateSuceess) {
                        resolve({status : 200, message: 'Delivery option updated!'})
                    }
                });
            });
        })
    }

    addProductInCart(productDetail, quantity = 1){
        return new Promise((resolve, reject)=>{
            this.isProductAlredyInCart(productDetail.id).then((addToCart: any)=> {
                if(addToCart.status && addToCart.status === 200) {
                    const cart = this.getCart();
                    const product = {... productDetail};
                    if(cart && cart.products && (cart.products.length > -1)) {
                        if(product && product.instock && product.instock >= quantity) {
                            delete product.instock;
                            product.qty = quantity;
                            cart.products.push(product);
                            this.cartCalculation(cart).then((calculatioDone) => {
                                if(calculatioDone) {
                                    this.updateCart(calculatioDone).then((success: any) => {
                                        if(success && success.status === 200) {
                                            resolve(success);
                                        }
                                    })
                                }
                            })
                        } else {
                            reject({status : 500, message: 'In-sufficient quantity available!'});
                        }
                    }
                }
            })
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
            resolve({status : 200, message : 'Cart updated successfully'});
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
                    cartObject.subTotal += element.totalPrice;
                });
                cartObject.grandTotal = cartObject.subTotal + cartObject.deliveryCharges;
                resolve(cartObject);
            } else {
                const emptyCartObject = {
                    deliveryCharges: 0,
                    products:[],
                    grandTotal: 0,
                    subTotal: 0
                }
                resolve(emptyCartObject);
            }
            /**
            * Write logic related to calculatio and return updated cartObject
            */
        });
    }


}