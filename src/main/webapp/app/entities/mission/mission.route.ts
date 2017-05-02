import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MissionComponent } from './mission.component';
import { MissionDetailComponent } from './mission-detail.component';
import { MissionPopupComponent } from './mission-dialog.component';
import { MissionDeletePopupComponent } from './mission-delete-dialog.component';

import { Principal } from '../../shared';


export const missionRoute: Routes = [
  {
    path: 'mission',
    component: MissionComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.mission.home.title'
    }
  }, {
    path: 'mission/:id',
    component: MissionDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.mission.home.title'
    }
  }
];

export const missionPopupRoute: Routes = [
  {
    path: 'mission-new',
    component: MissionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.mission.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'mission/:id/edit',
    component: MissionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.mission.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'mission/:id/delete',
    component: MissionDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.mission.home.title'
    },
    outlet: 'popup'
  }
];
