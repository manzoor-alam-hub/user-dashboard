import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class CartService{

    constructor(private afStore:AngularFirestore){}

    addToCart(data){
        return this.afStore.collection('cartItem').add(data).then((cartRes)=>{
            data.id = cartRes.id;
            this.afStore.collection('cartItem').doc(cartRes.id).set(data);
        })
    }

    getCartItem(){
        return this.afStore.collection('cartItem').snapshotChanges().pipe(
            map(action=>{
                return action.map((cartitem:any)=>{
                    const data = cartitem.payload.doc.data();
                    const id = cartitem.payload.doc.id;
                    return {id, ...data};
                });
            })
        )

    }

    getCartItemById(productId) {
        return this.afStore.doc(`products/${productId}`).valueChanges();
    }

    updateCart(data){
        return this.afStore.collection('products').doc(data.id).set(data)
    }

}   