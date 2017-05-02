import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Fashionidas } from './fashionidas.model';
import { FashionidasPopupService } from './fashionidas-popup.service';
import { FashionidasService } from './fashionidas.service';
@Component({
    selector: 'jhi-fashionidas-dialog',
    templateUrl: './fashionidas-dialog.component.html'
})
export class FashionidasDialogComponent implements OnInit {

    fashionidas: Fashionidas;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private fashionidasService: FashionidasService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['fashionidas']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.fashionidas.id !== undefined) {
            this.fashionidasService.update(this.fashionidas)
                .subscribe((res: Fashionidas) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.fashionidasService.create(this.fashionidas)
                .subscribe((res: Fashionidas) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Fashionidas) {
        this.eventManager.broadcast({ name: 'fashionidasListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-fashionidas-popup',
    template: ''
})
export class FashionidasPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private fashionidasPopupService: FashionidasPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.fashionidasPopupService
                    .open(FashionidasDialogComponent, params['id']);
            } else {
                this.modalRef = this.fashionidasPopupService
                    .open(FashionidasDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
