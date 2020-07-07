import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessedOrder } from '../processedOrder.model';

@Component({
  selector: 'app-order-print',
  templateUrl: './order-print.component.html',
  styleUrls: ['./order-print.component.css']
})
export class OrderPrintComponent implements OnInit {

  public obj:any;
  public orderData:ProcessedOrder[]=[]; 
  public orderIndex:number; 

  constructor( private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (data)=>{
        if(data.id){
          const orderId = data.id
          this.orderData = JSON.parse(localStorage.getItem('orders'));
          if(this.orderData && this.orderData.length >0){
             const orderInd = this.orderData.findIndex(orderdata => orderdata.orderId == orderId);
             if(orderInd > -1){
               this.orderIndex = orderInd;
               this.obj = this.orderData[this.orderIndex];
               console.log(this.obj);
             }
          }
        }
      }
    )
  }

}
