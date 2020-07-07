import { Component, OnInit } from '@angular/core';
import { ProcessedOrder } from '../processedOrder.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  public orderData:ProcessedOrder[]=[];


  constructor( private router:Router) {
    this.orderData = JSON.parse(localStorage.getItem('orders'))
   }

  ngOnInit() {
  }

  onView(index: number){
    const obj= this.orderData[index]
    console.log('orderId',obj);
    this.router.navigate(['/order-view', obj.orderId])  
}
onStatusChange(event, index){
  console.log('onStatusChange',event)
  const statusValue= event.target.value
  switch(statusValue){
    case 'Pending':{
      this.orderData[index].status.push(
        {
          status: 'Pending',
          title: 'Order is pending',
          timeStemp: Date.now()
        }
      )
     
    }
    break;
    case 'Accepted':{
      this.orderData[index].status.push(
        {
          status: 'Accepted',
          title: 'Order is Accepted',
          timeStemp: Date.now()
        }
      )
     
    }
    break;
    case 'On the Way':{
      this.orderData[index].status.push(
        {
          status: 'On the Way',
          title: 'Order is On the Way',
          timeStemp: Date.now()
        }
      )
     
    }
    break;
    case 'Cancelled':{
      this.orderData[index].status.push(
        {
          status: 'Cancelled',
          title: 'Order is Cancelled',
          timeStemp: Date.now()
        }
      )
     
    }
    break;
    case 'Delivered':{
      this.orderData[index].status.push(
        {
          status: 'Delivered',
          title: 'Order is Delivered',
          timeStemp: Date.now()
        }
      )
     
    }
    break;

  }
  localStorage.setItem('orders', JSON.stringify(this.orderData));
}
}
