export class ProductModel{
   public productName: string;
   public price : number;
   public imagePath: string;
   public description: string;   
   public discount: number;
   public offer : number;
   public Qty?:number;
   public offerPrice?:number;
   public totalPrice?:number;
   public instock:number;
   public productId?:number;
   public id:string;
 
   constructor(){}
}

export class ProductInCart {
   public productName: string;
   public actualPrice : number;
   public discountPrice : number;
   public imagePath: string;
   public description: string;
   public qty:number;
   public discount: number;
   public totalPrice: number; // totalPrice = qty*discountPrice;
   public id?:string;
   constructor(){
      this.qty = 1;
   }
}
export class ProductAddModel{
   public productName: string;
   public actualPrice : number;
   public discountPrice : number;
   public imagePath: string;
   public description: string;   
   public discount: number;
   public instock:number;
   public id?:string;
 
   constructor(){
      this.instock = 1;
   }
}