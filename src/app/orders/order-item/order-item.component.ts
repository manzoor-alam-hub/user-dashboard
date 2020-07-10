import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessedOrder } from '../processedOrder.model';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  public orders: ProcessedOrder[]= [] ;

  constructor(private router:Router, private ordersService:OrdersService) {
    // this.orders =  JSON.parse(localStorage.getItem('orders'));
   }

  ngOnInit() {
    this.ordersService.getOrdersData().subscribe(
      (data)=>{
        this.orders = data;
      }
    )

  }

  onNvigate(id){
    this.router.navigate([':/order-details', id])
  }

}
