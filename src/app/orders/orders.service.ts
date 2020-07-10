import{Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class OrdersService{

    constructor(private afStore:AngularFirestore){}


    createOrders(data){
        return this.afStore.collection('orders').add({... data}).then((dataRes:any)=>{
            data.id = dataRes.id;
            this.afStore.collection('orders').doc(dataRes.id).set({...data});
        });      
    }

    getOrdersData(){
        return this.afStore.collection('orders').snapshotChanges().pipe(
            map(action =>{
                return action.map((orders:any) =>{
                    const data = orders.payload.doc.data();
                    const id = orders.payload.doc.id;
                    return {id,...data};
                })
            })
        )
    }

    getOrderById(id){
        return this.afStore.doc(`orders/${id}`).valueChanges()
    }

}