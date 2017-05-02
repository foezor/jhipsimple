import { Fashionidas } from '../fashionidas';
import { Mission } from '../mission';
export class Feedback {
    constructor(
        public id?: number,
        public comment?: string,
        public rate?: number,
        public approved?: boolean,
        public creationDate?: any,
        public fashionidas?: Fashionidas,
        public mission?: Mission,
    ) { }
}
