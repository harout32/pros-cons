import { Injectable, Injector } from '@angular/core';
import { BaseRequest } from './base.request';
import { map } from 'rxjs/operators';
import { GroupIdResponseModel, UserIdResponseModel } from '@models';

@Injectable()
export class AuthorizeRequestService extends BaseRequest {

    constructor(injector: Injector) {
        super(injector);
    }
    public getGroupId(userName): Promise<string> {
        return this.get('group/' + userName).pipe( map((res: GroupIdResponseModel) => res.groupId) ).toPromise();
    }
    public getUserId(userName): Promise<string>  {
        return this.get('user/' + userName).pipe( map((res: UserIdResponseModel) => res.userId) ).toPromise();
    }
}
