import { Product } from './product';

export class CartItem {
    constructor(public id: number = null,
                public products: Product = null,
                public quantity: number = null) {}
}
