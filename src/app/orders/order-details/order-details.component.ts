import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessedOrder } from '../processedOrder.model';
import { JsonPipe } from '@angular/common';
import { AnimationQueryOptions } from '@angular/animations';
import { OrdersService } from '../orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  public orderInd: number;
  public orderData: ProcessedOrder[] = [];
  public obj:ProcessedOrder = new ProcessedOrder()

  constructor(private route: ActivatedRoute, private ordersService:OrdersService,
    private toaster:ToastrService, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
    (data)=>{
      if(data.id){
        const orderId = data.id;
        console.log(orderId);
        this.ordersService.getOrderById(orderId).subscribe(
          (res:any)=>{
            if(res && res.id){
              this.obj = res
              console.log(this.obj);
            }else{
              this.toaster.info('order not found!!!');
            }
          }
        )
      }
    }
    );
  }

  onNavigate(id){
    console.log(id);
    this.router.navigate(['order-print', id]);
  }

}
