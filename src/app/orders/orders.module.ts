import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderPrintComponent } from './order-print/order-print.component';
@NgModule({
    declarations:[  OrdersComponent,
        OrderDetailsComponent,
        OrderListComponent,
        OrderItemComponent,
        OrderViewComponent,
        OrderPrintComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        OrdersRoutingModule
    ]
})
export class OrdersModule{

}