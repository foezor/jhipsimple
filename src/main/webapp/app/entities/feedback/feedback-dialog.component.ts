import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Feedback } from './feedback.model';
import { FeedbackPopupService } from './feedback-popup.service';
import { FeedbackService } from './feedback.service';
import { Fashionidas, FashionidasService } from '../fashionidas';
import { Mission, MissionService } from '../mission';
@Component({
    selector: 'jhi-feedback-dialog',
    templateUrl: './feedback-dialog.component.html'
})
export class FeedbackDialogComponent implements OnInit {

    feedback: Feedback;
    authorities: any[];
    isSaving: boolean;

    fashionidas: Fashionidas[];

    missions: Mission[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private feedbackService: FeedbackService,
        private fashionidasService: FashionidasService,
        private missionService: MissionService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['feedback']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.fashionidasService.query().subscribe(
            (res: Response) => { this.fashionidas = res.json(); }, (res: Response) => this.onError(res.json()));
        this.missionService.query().subscribe(
            (res: Response) => { this.missions = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.feedback.id !== undefined) {
            this.feedbackService.update(this.feedback)
                .subscribe((res: Feedback) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.feedbackService.create(this.feedback)
                .subscribe((res: Feedback) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Feedback) {
        this.eventManager.broadcast({ name: 'feedbackListModification', content: 'OK'});
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

    trackFashionidasById(index: number, item: Fashionidas) {
        return item.id;
    }

    trackMissionById(index: number, item: Mission) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-feedback-popup',
    template: ''
})
export class FeedbackPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private feedbackPopupService: FeedbackPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.feedbackPopupService
                    .open(FeedbackDialogComponent, params['id']);
            } else {
                this.modalRef = this.feedbackPopupService
                    .open(FeedbackDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
