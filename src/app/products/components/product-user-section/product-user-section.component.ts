import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterDto } from 'src/app/models/filter-dto';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { UserService } from '../../services/user.service';
import { ShoppingCartService } from 'src/app/user-ui/services/shopping-cart.service';

@Component({
  selector: 'app-product-user-section',
  templateUrl: './product-user-section.component.html',
  styleUrls: ['./product-user-section.component.css']
})
export class ProductUserSectionComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  _listFilter: string;
  filterProducts: Product[];
  products: Product[];
  errorMessage: string;
  filterForm: FormGroup;
  filterDto: FilterDto;
  favourite = false;
  id: number;
  hasActive = false;



  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  constructor(private productService: ProductService,
              private router: Router,
              private fb: FormBuilder,
              private service: AuthService,
              private userService: UserService,
              private shoppingCartService: ShoppingCartService) {
}

ngOnInit() {
  this.getProductAll();

  this.filterForm = this.fb.group({
    order: ''
  });



  const groupControl = this.filterForm;
  groupControl.valueChanges.subscribe(
    () => this.filterAdvance()
  );


  this.shoppingCartService.hasActiveShoppingCart().subscribe({
    next: value => this.hasActive = value
  });

}

onClickShoppingCart(): void {
  if (this.hasActive) {
    this.router.navigate(['/user-ui/shopping-cart']);
  } else {
    this.shoppingCartService.createNewShoppingCart().subscribe({
      next: () => this.ngOnInit()
    });
  }
}

filterAdvance(): void {
  this.productService.filterProducts(this.filterForm).subscribe({
    next: products => {
      this.products = products;
      this.filterProducts = products;
      console.log(products);
    },
    error: err => this.errorMessage = err
  });
}

getProductAll(): void {
  this.productService.getActiveProducts().subscribe({
    next: products => {
      this.products = products;
      this.filterProducts = this.products;
      console.log(this.products);
    },
    error: err => this.errorMessage = err
    });
}

performFilter(filterBy: string): Product[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: Product) =>
    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}


}
