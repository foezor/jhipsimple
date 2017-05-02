import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsimpleSharedModule } from '../../shared';

import {
    FashionidasService,
    FashionidasPopupService,
    FashionidasComponent,
    FashionidasDetailComponent,
    FashionidasDialogComponent,
    FashionidasPopupComponent,
    FashionidasDeletePopupComponent,
    FashionidasDeleteDialogComponent,
    fashionidasRoute,
    fashionidasPopupRoute,
} from './';

let ENTITY_STATES = [
    ...fashionidasRoute,
    ...fashionidasPopupRoute,
];

@NgModule({
    imports: [
        JhipsimpleSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FashionidasComponent,
        FashionidasDetailComponent,
        FashionidasDialogComponent,
        FashionidasDeleteDialogComponent,
        FashionidasPopupComponent,
        FashionidasDeletePopupComponent,
    ],
    entryComponents: [
        FashionidasComponent,
        FashionidasDialogComponent,
        FashionidasPopupComponent,
        FashionidasDeleteDialogComponent,
        FashionidasDeletePopupComponent,
    ],
    providers: [
        FashionidasService,
        FashionidasPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsimpleFashionidasModule {}
