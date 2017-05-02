import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Fashionidas } from './fashionidas.model';
import { FashionidasService } from './fashionidas.service';

@Component({
    selector: 'jhi-fashionidas-detail',
    templateUrl: './fashionidas-detail.component.html'
})
export class FashionidasDetailComponent implements OnInit, OnDestroy {

    fashionidas: Fashionidas;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private fashionidasService: FashionidasService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['fashionidas']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.fashionidasService.find(id).subscribe(fashionidas => {
            this.fashionidas = fashionidas;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
