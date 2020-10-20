import { CartItem } from './cart-item';
import { User } from './user';

export class ShoppingCart {
    constructor(public id: number = null,
                public cartStatus: string = '',
                public createDate: string = '',
                public endDate: string = '',
                public user: User = null,
                public cartItems: CartItem[] = []) {}
}
