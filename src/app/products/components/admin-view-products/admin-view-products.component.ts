import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-view-products',
  templateUrl: './admin-view-products.component.html',
  styleUrls: ['./admin-view-products.component.css']
})
export class AdminViewProductsComponent implements OnInit {

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  // tslint:disable-next-line:variable-name
  _listFilter: string;
  filterProducts: Product[];
  products: Product[];
  errorMessage: string;
  selectedProduct: Product;


  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  constructor(private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.getProductAll();
  }

  getProductAll(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filterProducts = this.products;
        // console.log(this.products);
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onEditClick(id: number): void {
    this.router.navigate(['admin-managment/products/add-edit', id]);
  }

  onRemoveClick(id: number): void {
    this.productService.removeProduct(id)
      .subscribe({
        next: () => this.getProductAll(),
        error: err => this.errorMessage = err
      });
    this.getProduct(id);
  }

  onRestoreClick(id: number): void {
    this.productService.activateProduct(id)
    .subscribe({
      next: () => this.getProductAll(),
      error: err => this.errorMessage = err
    });
    this.getProduct(id);
  }


  onDeleteClick(id: number, name: string): void {
    if (confirm(`Really delete the product: ${name}?? You won't be able to return it back anymore!!! Please confirm this decision.`)) {
      this.productService.deleteProduct(id)
      .subscribe({
        next: () => this.getProductAll(),
        error: err => this.errorMessage = err
      });
    }
  }

  getProduct(id: number): void {
    if (id !== 0) {
      this.productService.getProductById(id).subscribe({
        next: productt => {
            this.selectedProduct = productt;
        },
        error: err => this.errorMessage = err
      });
    } else {
      this.selectedProduct = new Product();
      console.log('Add product!!');
    }
  }

}
