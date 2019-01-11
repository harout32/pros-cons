import { Component, OnInit } from '@angular/core';
import { ProConService } from '@services';
import { ProConResponseModel } from '@models';

@Component({
    selector: 'challenge-pro-con-page',
    templateUrl: 'pro-con-page.component.html'
})

export class ProConPageComponent implements OnInit {
    public proCon: ProConResponseModel;
    constructor(private proConService: ProConService) { }

    ngOnInit() {
        console.log(this.proConService);
        this.proCon = this.proConService.getProCon();
    }
}
