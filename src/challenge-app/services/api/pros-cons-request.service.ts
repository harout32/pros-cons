import { Injectable, Injector } from '@angular/core';
import { BaseRequest } from './base.request';
import { UserDataModel } from '@models';
import { Observable } from 'rxjs';
import { ProConResponseModel } from '@models';

@Injectable()
export class ProsConsRequestService extends BaseRequest {

    constructor(injector: Injector) {
        super(injector);
     }
     public getProCon({userId, groupId}: UserDataModel): Observable<any> {
         return this.get(`proscons/group/${groupId}/user/${userId}`);
     }
     public saveProCon({userId, groupId}: UserDataModel, data: ProConResponseModel): Promise<any> {
         return this.put(`proscons/group/${groupId}/user/${userId}`, data).toPromise();
     }
}
