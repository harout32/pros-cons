import { Injectable } from '@angular/core';
import { ProConResponseModel } from '@models';

@Injectable()
export class ProConService {
    private state: ProConResponseModel = {pros: [], cons: []};
    constructor() { }
    public setProCon(data: ProConResponseModel) {
        this.state = data;
    }
    public getProCon(): ProConResponseModel {
        return {...this.state};
    }
}
