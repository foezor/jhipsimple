import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Mission } from './mission.model';
import { MissionService } from './mission.service';

@Component({
    selector: 'jhi-mission-detail',
    templateUrl: './mission-detail.component.html'
})
export class MissionDetailComponent implements OnInit, OnDestroy {

    mission: Mission;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private missionService: MissionService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['mission']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.missionService.find(id).subscribe(mission => {
            this.mission = mission;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
