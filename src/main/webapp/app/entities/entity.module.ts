import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsimpleFashionidasModule } from './fashionidas/fashionidas.module';
import { JhipsimpleFeedbackModule } from './feedback/feedback.module';
import { JhipsimpleMissionModule } from './mission/mission.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsimpleFashionidasModule,
        JhipsimpleFeedbackModule,
        JhipsimpleMissionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsimpleEntityModule {}
