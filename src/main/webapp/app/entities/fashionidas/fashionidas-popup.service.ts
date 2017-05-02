import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Fashionidas } from './fashionidas.model';
import { FashionidasService } from './fashionidas.service';
@Injectable()
export class FashionidasPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private fashionidasService: FashionidasService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.fashionidasService.find(id).subscribe(fashionidas => {
                this.fashionidasModalRef(component, fashionidas);
            });
        } else {
            return this.fashionidasModalRef(component, new Fashionidas());
        }
    }

    fashionidasModalRef(component: Component, fashionidas: Fashionidas): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.fashionidas = fashionidas;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
