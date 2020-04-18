import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService{

    private msgService = new BehaviorSubject<string>('Default msg from service');
        currentMsg = this.msgService.asObservable();

        changeMsg(msg:string){
            this.msgService.next(msg);
        }
}