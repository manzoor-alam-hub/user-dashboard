import { Cart } from '../cart/cart.model';
import { AddressModel } from '../checkout/address.model';

export class OrdersModel{
    public orderDetails:Array<Cart>;
    public deliveryDetails:{
        isPickUp?: boolean, // if User select Pickup then isPickUp true otherwise false
        scheduleInfo?: {
            time: string,
            date: string
        },
        deliveryCharges?: number,
        deliveryAddress?: AddressModel
    }
    public createdAt: string; // timestemp when order saved or placed
    public updatedAt: string; // last timestemp when order updated
    public status: string; // Placed, out for delivery, delivered, cancelled, return.
   

}