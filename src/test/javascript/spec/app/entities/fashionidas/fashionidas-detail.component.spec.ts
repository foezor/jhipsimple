import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { FashionidasDetailComponent } from '../../../../../../main/webapp/app/entities/fashionidas/fashionidas-detail.component';
import { FashionidasService } from '../../../../../../main/webapp/app/entities/fashionidas/fashionidas.service';
import { Fashionidas } from '../../../../../../main/webapp/app/entities/fashionidas/fashionidas.model';

describe('Component Tests', () => {

    describe('Fashionidas Management Detail Component', () => {
        let comp: FashionidasDetailComponent;
        let fixture: ComponentFixture<FashionidasDetailComponent>;
        let service: FashionidasService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [FashionidasDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    FashionidasService
                ]
            }).overrideComponent(FashionidasDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FashionidasDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FashionidasService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Fashionidas(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.fashionidas).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
