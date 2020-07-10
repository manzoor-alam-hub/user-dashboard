import {Injectable} from  '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { RegistrationModel } from '../registration-page/registration.model';


@Injectable({
    providedIn: 'root'
})
export class Authservice{

    constructor( private afAuth: AngularFireAuth, private afStore: AngularFirestore){}

    async signUp(email:string, password:string){
        return await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    }


  async  login(email:string, password: string ){
          return  await this.afAuth.auth.signInWithEmailAndPassword(email, password);
       
    }

    createUserdata(data:RegistrationModel){
        return  this.afStore.collection('users').add(data).then((dataRes:any)=>{
            data.id = dataRes.id;
            this.afStore.collection('users').doc(dataRes.id).set(data);
        });      
            
    }

    getUserdata(){
        return this.afStore.collection('users').snapshotChanges().pipe(
            map(action =>{
                return action.map((u:any) =>{
                    const data = u.payload.doc.data();
                    const id = u.payload.doc.id;
                    return {id,...data};
                })
            })
        )
    }

    getUserdataById(userId){
       return this.afStore.doc(`users/${userId}`).valueChanges();
    }

    getUserDataByEmail(email:string){
        return this.afStore.collection('users', ref =>ref.where('email', '==', email)).valueChanges()
    }

    updateUserdata(data){
        return this.afStore.collection('users').doc(data.id).set(data)
    }

}