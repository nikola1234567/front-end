export class FilterDto {
    constructor(public priceAsc: boolean = false,
                public priceDesc: boolean = false,
                public dateAsc: boolean = false,
                public dateDesc: boolean = false,
                public ratingAsc: boolean = false,
                public ratingDesc: boolean = false,
                public male: boolean = false,
                public female: boolean = false,
                public tShirt: boolean = false,
                public shoes: boolean = false,
                public shirt: boolean = false,
                public tux: boolean = false,
                public jeans: boolean = false,
                public trousers: boolean = false,
                public jacket: boolean = false,
                public defaultt: boolean = false) {}
}
