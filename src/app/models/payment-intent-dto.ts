export class PaymentIntentDto {
    constructor(public token: string = '',
                public userId: string = '',
                public description: string = '',
                public amount: number = null,
                public currency: string = '') {}
}
