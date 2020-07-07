import { ProductInCart } from '../product/product.model';

export class Cart {
    public products : Array<ProductInCart>;
    public grandTotal: number;
    public subTotal: number;
    public deliveryCharges: number
    public deliveryOption: string;
    constructor() {
        this.grandTotal = 0;
        this.subTotal = 0;
        this.deliveryCharges = 0;
    }
}