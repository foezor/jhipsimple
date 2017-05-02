import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Fashionidas } from './fashionidas.model';
import { FashionidasService } from './fashionidas.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-fashionidas',
    templateUrl: './fashionidas.component.html'
})
export class FashionidasComponent implements OnInit, OnDestroy {
fashionidas: Fashionidas[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private fashionidasService: FashionidasService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['fashionidas']);
    }

    loadAll() {
        this.fashionidasService.query().subscribe(
            (res: Response) => {
                this.fashionidas = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFashionidas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Fashionidas) {
        return item.id;
    }



    registerChangeInFashionidas() {
        this.eventSubscriber = this.eventManager.subscribe('fashionidasListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
