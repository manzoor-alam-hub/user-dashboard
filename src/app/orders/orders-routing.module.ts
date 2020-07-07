import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderPrintComponent } from './order-print/order-print.component';

const routes:Routes = [
    {path: 'orders', component: OrderItemComponent},
    {path: ':/order-details/:id', component: OrderDetailsComponent},
    {path: 'order-list', component:OrderListComponent},
    {path: 'order-view/:id', component:OrderViewComponent},
    {path: 'order-print', component:OrderPrintComponent}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class OrdersRoutingModule{

}