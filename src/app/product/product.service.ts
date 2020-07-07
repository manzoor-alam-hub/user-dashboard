import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { ProductAddModel } from './product.model';
@Injectable({
    providedIn:'root'
})
export class ProductService{

        constructor(private afStore:AngularFirestore){}

        addProduct(data: ProductAddModel){
            return this.afStore.collection('products').add(data).then((dataRes: any) => {
                data.id = dataRes.id;
                this.afStore.collection('products').doc(dataRes.id).set(data);
            });
        }

        getProduct(){
            return this.afStore.collection('products').snapshotChanges().pipe(
                map(action=>{
                    return action.map((product:any)=>{
                        const data = product.payload.doc.data();
                        const id = product.payload.doc.id;
                        return {id, ...data};
                    });
                })
            )

        }
        getProductDetailById(productId) {
            // return this.afStore.collection('products',  ref => ref.where('id', '==', productId)).valueChanges();
            return this.afStore.doc(`products/${productId}`).valueChanges();
        }
        
        updateProduct(data){
            return this.afStore.collection('products').doc(data.id).set(data)
        }

        deleteProdcut(productId){
            return this.afStore.collection('products').doc(productId).delete()
        }

}