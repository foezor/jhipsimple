import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Fashionidas } from './fashionidas.model';
import { FashionidasPopupService } from './fashionidas-popup.service';
import { FashionidasService } from './fashionidas.service';

@Component({
    selector: 'jhi-fashionidas-delete-dialog',
    templateUrl: './fashionidas-delete-dialog.component.html'
})
export class FashionidasDeleteDialogComponent {

    fashionidas: Fashionidas;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private fashionidasService: FashionidasService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['fashionidas']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.fashionidasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'fashionidasListModification',
                content: 'Deleted an fashionidas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fashionidas-delete-popup',
    template: ''
})
export class FashionidasDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private fashionidasPopupService: FashionidasPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.fashionidasPopupService
                .open(FashionidasDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
