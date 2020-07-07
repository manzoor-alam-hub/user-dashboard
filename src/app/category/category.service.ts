import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { CatagoryModel } from './category.model';
@Injectable({
    providedIn: 'root'
})
export class CategoryService{

    constructor(private afStore:AngularFirestore){}

    addCategory(data:CatagoryModel){
        return  this.afStore.collection('category').add(data).then((dataRes:any)=>{
            data.id = dataRes.id;
            this.afStore.collection('category').doc(dataRes.id).set(data);
        });      
    }

    getCategory(){
        return this.afStore.collection('category').snapshotChanges().pipe(
            map(action =>{
                return action.map((category:any) =>{
                    const data = category.payload.doc.data();
                    const id = category.payload.doc.id;
                    return {id,...data};
                })
            })
        )
    }

    getCategoryById(categoryId){
        return this.afStore.doc(`category/${categoryId}`).valueChanges();

    }

    updateCategory(data){
        return this.afStore.collection('category').doc(data.id).set(data)
    }

    deleteCategory(categoryId){
        return this.afStore.collection('category').doc(categoryId).delete();
    }

}