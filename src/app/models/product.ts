import { DomSanitizer } from '@angular/platform-browser';
import { Category } from './category';
import { Image } from './image';

export class Product {
  constructor(public id: number = 0,
              public productName: string = null,
              public productCode: string = null,
              public starRating: number = null,
              public quantity: number = null,
              public price: number = null,
              public condition: string = null,
              public brand: string = null,
              public description: string = null,
              public category: Category = new Category(),
              public images: Image[] = [],
              public persistence: boolean = null) {
  }

}
