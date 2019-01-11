import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ProsConsRequestService } from '@services/api';
import { AuthService } from '../auth.service';
import { ProConService } from '../pro-con.service';
import { UserDataModel, ProConResponseModel } from '@models';
@Injectable()
export class ProConGuard implements CanActivate {

    constructor(
        private prosConsRequestService: ProsConsRequestService,
        private proConService: ProConService,
        private authService: AuthService,
        private router: Router
    ) { }
    canActivate(): Promise<boolean> | boolean {
        const userData: UserDataModel = this.authService.getUserData();
        if (!userData) {
            return this.redirect();
        }
        return this.getProCon(userData).catch(err => {
            return this.redirect();
        });
    }
    private async getProCon(userData: UserDataModel) {
        const data: ProConResponseModel = await this.prosConsRequestService.getProCon(userData);
        this.proConService.setProCon(data);
        return true;
    }
    private redirect(): boolean {
        this.router.navigate(['/login']);
        return false;
    }
}