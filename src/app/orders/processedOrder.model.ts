import { ProductModel, ProductAddModel, ProductInCart } from '../product/product.model';
import { AddressModel } from '../checkout/address.model';

export class ProcessedOrder{
        grandTotal: number;
        subTotal : number;
        orderId : string;
        id:string;
        orderItem : Array<ProductInCart> ;
        status : [{
            status: string,
            title: string,
            timeStemp: number
        }];
        deliveryInfo:{
            address:AddressModel,
            deliveryType?:string,
            deliveryCharge?: any,
            date?: any,
            time?: any
        };
        paymentInfo:{
            paymentMode: string,
            payableAmount: number,  
        };
        userInfo:{
            email: string,
            enable: boolean
            number: number
            role: string,
            username: string
        }
    constructor(){
        
    }
}