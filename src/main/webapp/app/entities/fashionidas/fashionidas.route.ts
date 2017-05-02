import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { FashionidasComponent } from './fashionidas.component';
import { FashionidasDetailComponent } from './fashionidas-detail.component';
import { FashionidasPopupComponent } from './fashionidas-dialog.component';
import { FashionidasDeletePopupComponent } from './fashionidas-delete-dialog.component';

import { Principal } from '../../shared';


export const fashionidasRoute: Routes = [
  {
    path: 'fashionidas',
    component: FashionidasComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.fashionidas.home.title'
    }
  }, {
    path: 'fashionidas/:id',
    component: FashionidasDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.fashionidas.home.title'
    }
  }
];

export const fashionidasPopupRoute: Routes = [
  {
    path: 'fashionidas-new',
    component: FashionidasPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.fashionidas.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'fashionidas/:id/edit',
    component: FashionidasPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.fashionidas.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'fashionidas/:id/delete',
    component: FashionidasDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'jhipsimpleApp.fashionidas.home.title'
    },
    outlet: 'popup'
  }
];
