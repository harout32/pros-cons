import { Injectable } from '@angular/core';
import { ProConResponseModel } from '@models';
import { Observable, Subject } from 'rxjs';
import { ProsConsRequestService } from './api/pros-cons-request.service';
import { AuthService } from './auth.service';

@Injectable()
export class ProConService {
    private state: ProConResponseModel = {pros: [], cons: []};
    public observe: Subject<ProConResponseModel> = new Subject();
    constructor(private prosConsRequestService: ProsConsRequestService, private authService: AuthService) { }
    private async notify() {
        return await this.prosConsRequestService.saveProCon(this.authService.getUserData(), this.state).then(res => {
            this.observe.next({pros: [...this.state.pros], cons: [...this.state.cons]});
            return Promise.resolve('resolved');
        }, err => Promise.resolve('rejected'));
    }
    public setProCon(data: ProConResponseModel) {
        // because Api not working fine
        this.state.pros = data.pros ? data.pros : [];
        this.state.cons = data.cons ? data.cons : [];
        this.notify();
    }
    public getProCon(): Observable<ProConResponseModel> {
        return this.observe.asObservable();
    }
    public deleteItem(listId: string, index: number) {
        const tempArr = [...this.state[listId]];
        tempArr.splice(index, 1);
        this.state[listId] = tempArr;
        return this.notify();
    }
    public addItem(listId: string, newItem: string) {
        this.state[listId].push(newItem);
        return this.notify();
    }
    public editItem(listId: string, index: number, newItem: string) {
        this.state[listId][index] = newItem;
        return this.notify();
    }
}
