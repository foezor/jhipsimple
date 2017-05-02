import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Feedback } from './feedback.model';
import { FeedbackService } from './feedback.service';

@Component({
    selector: 'jhi-feedback-detail',
    templateUrl: './feedback-detail.component.html'
})
export class FeedbackDetailComponent implements OnInit, OnDestroy {

    feedback: Feedback;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private feedbackService: FeedbackService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['feedback']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.feedbackService.find(id).subscribe(feedback => {
            this.feedback = feedback;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
