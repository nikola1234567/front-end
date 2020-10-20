import {Product} from './product';

export class ProductDto {
  constructor(private productName: string = ' ',
              private productCode: string = ' ',
              private starRating: number = null,
              private quantity: number = null,
              private price: number = null,
              private brand: string = ' ',
              private description: string = ' ') {
  }

  createProductDto(product: Product): ProductDto {
    const product1: ProductDto = new ProductDto();
    product1.productName = product.productName;
    product1.productCode = product.productCode;
    product1.starRating = product.starRating;
    product1.quantity = product.quantity;
    product1.price = product.price;
    product1.brand = product.brand;
    product1.description = product.description;
    return product1;
  }
}
