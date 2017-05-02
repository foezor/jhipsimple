import { Fashionidas } from '../fashionidas';
export class Mission {
    constructor(
        public id?: number,
        public theme?: string,
        public maximumAmount?: number,
        public fashionidas?: Fashionidas,
    ) { }
}
