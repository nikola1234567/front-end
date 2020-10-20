import { Role } from './role';

export class AuthenticationResponse {
    constructor(public jwt: string = ' ',
                public userId: number = null,
                public roles: Role[] = []) {}
}
