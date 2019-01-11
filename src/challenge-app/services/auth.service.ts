import { Injectable } from '@angular/core';
import { UserDataModel } from '@models';
@Injectable()
export class AuthService {
    private userState: UserDataModel = null;
    constructor() { }
    public setUserData(userData: UserDataModel) {
        this.userState = userData;
    }
    public getUserData (): UserDataModel {
        if (!this.userState) {
            return null;
        }
        return {...this.userState};
    }
}
