import { Image } from './image';
import { Product } from './product';
import { Role } from './role';

export class User {
    constructor(public id: number = null,
                public name: string = ' ',
                public surname: string = ' ',
                public email: string = ' ',
                public userName: string = ' ',
                public createDate: string = ' ',
                public roles: Role[] = [],
                public image: Image = null) {}
}
