export class Category {
    constructor(public id: number = null,
                public gender: string = null,
                public type: string = null,
                private persistence: boolean = null) {}
}
