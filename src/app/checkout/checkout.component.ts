import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AddressModel } from './address.model';
import { Cart } from '../cart/cart.model';
import { Router } from '@angular/router';
import { OrdersModel } from '../orders/orders.model';
import { ProcessedOrder } from '../orders/processedOrder.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public today = new Date();
  public time: any = {hour: 13, minute: 30, second: 0};
  meridian = true;
  public dateForm:NgForm;
  public paymentForm: any;
  public addressForm:any;
  public isAddressShow:boolean;
  public isVisible = true;
  public isPaymentShow = false;
  public isOrderShow = false;
  public model:NgbDateStruct;
  public addressData:AddressModel[] = [];
  public orderItem:any[] = [];
  public addressObj:AddressModel;
  public editMode:boolean;
  public selectedIndex: number;
  public shoppingCart:Cart;
  public orderdata: OrdersModel;
  public isPickUp: boolean;
  public pickDate= false;
  public orderObj = new ProcessedOrder();
  constructor( private config:NgbTimepickerConfig, private router: Router,private tostre:ToastrService) {
    this.shoppingCart = new Cart;
    this.orderObj = new ProcessedOrder();
    this.shoppingCart = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : new Cart();
    this.orderObj.grandTotal = this.shoppingCart.grandTotal;
    this.orderObj.subTotal = this.shoppingCart.subTotal;
    this.orderObj.orderItem = this.shoppingCart.products;
    // this.orderdata = localStorage.getItem('orderItem')? JSON.parse(localStorage.getItem('orderItem')): new OrdersModel();
    this.getTime();
    config.spinners = false;
    const checkData = JSON.parse(localStorage.getItem('address'));
      checkData ? this.addressData = checkData : this.addressData = [];

      const checkOrder = JSON.parse(localStorage.getItem('orders'));
      checkOrder ? this.orderItem = checkOrder: this.orderItem = [];
   
   }

  ngOnInit() {
   
  }
 getTime(){
   this.time = this.today.getHours() + " : " + this.today.getMinutes() ;
 }
 
 getCurrentTime() {
   const formatedTime = this.today.getHours() + " : " + this.today.getMinutes();
   return formatedTime;
 }

  onSubmit(form:NgForm){

    if(this.editMode){
      const data = {...this.addressObj};
      this.addressData[this.selectedIndex]= data;
      localStorage.setItem('address', JSON.stringify(this.addressData));
      this.isAddressShow = false
      this.editMode = false
    }else{
      this.addressForm = form.value;
      this.addressData.push(this.addressForm);
      localStorage.setItem('address', JSON.stringify(this.addressData));
      console.log(this.addressForm);
    }
     
      form.reset();
  }

  onUpdate(index){
    this.editMode = true;
    this.isAddressShow = true
    this.selectedIndex = index;
    const data = {... this.addressData[index]};
    this.addressObj = data;

  }

  onDelete(index:number){
    this.addressData.splice(index, 1);
    localStorage.setItem('address', JSON.stringify(this.addressData))
  }

  onAddress(){
    this.isAddressShow = !this.isAddressShow;
    if(this.isAddressShow) {
      this.addressObj = new AddressModel();
    }
  }

  onCancle(){
    this.isAddressShow = false;
    this.editMode = false
  }
  onDeliver(index:number){
    this.pickDate = true;
    this.isOrderShow = false;
    this.isVisible = false;
    this.isPaymentShow = false;
    this.addressObj = this.addressData[index];
    // this.isPickUp = this.orderdata.deliveryDetails.isPickUp;
    console.log('delivery', this.isPickUp);
    this.orderObj.deliveryInfo = {
      address: this.addressObj,
      deliveryType: this.shoppingCart.deliveryOption,
      deliveryCharge: this.shoppingCart.deliveryCharges
    }
  }

  onContinue(form:NgForm){
    this.isOrderShow = true;
    this.isVisible = false;
    this.isPaymentShow = false; 
    this.pickDate = false;
    this.orderObj.deliveryInfo.date = this.model;
    this.orderObj.deliveryInfo.time = this.time ;
    console.log(this.orderObj)
   

  }

  onDelivery(){
    this.isVisible = true;
    this.isPaymentShow = false;
    this.isOrderShow = false;
    this.pickDate = false
  }

  onPay(){
    this.isPaymentShow = true;
    this.isVisible = false;
    this.isOrderShow = false;
    console.log(this.orderObj.orderItem);
  
    
  }
  
  placeOrder(form: NgForm){
    this.paymentForm = form.value;
    console.log(this.paymentForm);
    this.orderObj.paymentInfo = {
      paymentMode:'COD',
      payableAmount: this.shoppingCart.grandTotal
    }
    const itemId = 'CF' + Math.floor(Date.now()/1000);
    this.orderObj.orderId = itemId;  
    this.orderObj.status = [{
      status: 'Placed',
      title: 'Order Placed successfully',
      timeStemp: Date.now()
    }];
    this.orderObj.userInfo = JSON.parse(localStorage.getItem('logedInUser'));
    const userOrders = this.orderItem;
    userOrders.push(this.orderObj)
    localStorage.setItem('orders', JSON.stringify (userOrders));
    localStorage.removeItem('cartItem')
    this.router.navigate(['/orders']);
    this.tostre.success('Order Placed', 'Success')

  }

}
