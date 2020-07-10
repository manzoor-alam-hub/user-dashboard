import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessedOrder } from '../processedOrder.model';
import { OrdersService } from '../orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-print',
  templateUrl: './order-print.component.html',
  styleUrls: ['./order-print.component.css']
})
export class OrderPrintComponent implements OnInit {

  public obj:ProcessedOrder = new ProcessedOrder();
  public orderData:ProcessedOrder[]=[]; 
  public orderIndex:number; 

  constructor( private route:ActivatedRoute, private ordersService:OrdersService, private toaster:ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (data)=>{
        if(data.id){
          const orderId = data.id
          this.ordersService.getOrderById(orderId).subscribe(
            (res:any)=>{
              if(res && res.id){
                this.obj = res;
              }else{
                this.toaster.error('order not found')
              }
            }
          )
          // this.orderData = JSON.parse(localStorage.getItem('orders'));
          // if(this.orderData && this.orderData.length >0){
          //    const orderInd = this.orderData.findIndex(orderdata => orderdata.orderId == orderId);
          //    if(orderInd > -1){
          //      this.orderIndex = orderInd;
          //      this.obj = this.orderData[this.orderIndex];
          //      console.log(this.obj);
          //    }
          // }
        }
      }
    )
  }

}
