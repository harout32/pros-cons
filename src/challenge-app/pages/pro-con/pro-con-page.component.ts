import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProConService } from '@services';
import { ProConResponseModel } from '@models';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'challenge-pro-con-page',
    templateUrl: 'pro-con-page.component.html',
    styleUrls: ['./pro-con-page.component.scss']
})

export class ProConPageComponent implements OnInit, OnDestroy {
    public proCon: ProConResponseModel;
    private proConSubscription: Subscription;
    constructor(private proConService: ProConService, private router: ActivatedRoute) { }

    ngOnInit() {

        this.router.data.subscribe(data => {
            this.proCon = data.proCon;
        });
        this.proConSubscription = this.proConService.getProCon().subscribe(data => {
            this.proCon = data;
        });
    }
    ngOnDestroy() {
        this.proConSubscription.unsubscribe();
    }
}
