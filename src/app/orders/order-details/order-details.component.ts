import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessedOrder } from '../processedOrder.model';
import { JsonPipe } from '@angular/common';
import { AnimationQueryOptions } from '@angular/animations';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public orderInd: number;
  public orderData: ProcessedOrder[] = [];
  public obj: any

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
    (data)=>{
      if(data.id){
        const orderId = data.id;
        this.orderInd = orderId;
        this.orderData = JSON.parse(localStorage.getItem('orders'));
        if(this.orderData && this.orderData.length>0 && this.orderData[data.id]){
          this.obj =this.orderData[data.id]
         console.log(this.obj);
       }
      }
    }
    );
  }

}
