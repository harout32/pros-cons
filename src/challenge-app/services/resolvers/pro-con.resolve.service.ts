import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ProConResponseModel } from '@models';
import { ProsConsRequestService } from '../api';
import { of, throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProConService } from '../pro-con.service';
import { AuthService } from '../auth.service';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class ProConResolveService implements Resolve<Observable<ProConResponseModel>> {

    constructor(
        private prosConsRequestService: ProsConsRequestService,
        private proConService: ProConService,
        private authService: AuthService,
        private router: Router,
        private message: NzMessageService,
    ) { }
    resolve(activatedRoute: ActivatedRouteSnapshot): Observable<ProConResponseModel> {

            const {userId, groupId} = activatedRoute.params;
            if (!userId || !groupId) {
                this.message.create('error', 'Something Went Wrong Please Log In Again !');
                return this.catchErr('Something Went Wrong Please Log In Again !');
            }

            return this.prosConsRequestService.getProCon({userId, groupId})
            .pipe(map(res => {
                    this.authService.setUserData({userId, groupId});
                    this.proConService.setProCon(res);
                    return res;
                }), catchError(err => this.catchErr(err)));

    }
    catchErr(err) {
        this.router.navigate(['/login']);
        return throwError(err);
    }
}
