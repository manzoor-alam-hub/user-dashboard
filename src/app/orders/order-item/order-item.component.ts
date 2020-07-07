import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessedOrder } from '../processedOrder.model';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  public orders: ProcessedOrder[]= [] ;

  constructor(private router:Router) {
    this.orders =  JSON.parse(localStorage.getItem('orders'));
   }

  ngOnInit() {
  }

  onNvigate(index:number){
    this.router.navigate([':/order-details', index])
  }

}
