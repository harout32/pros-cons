import { Injectable, Injector } from '@angular/core';
import { BaseRequest } from './base.request';
import { UserDataModel } from '@models';

@Injectable()
export class ProsConsRequestService extends BaseRequest {

    constructor(injector: Injector) {
        super(injector);
     }
     getProCon({userId, groupId}: UserDataModel): Promise<any> {
         return this.get(`proscons/group/${groupId}/user/${userId}`).toPromise();
     }
}
