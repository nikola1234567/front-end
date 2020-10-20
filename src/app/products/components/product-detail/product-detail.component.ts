import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ShoppingCartService } from 'src/app/user-ui/services/shopping-cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  pageTitle = 'Product Details';
  errorMessage: string;
  id: number;
  givenFeedback = false;
  favourite = false;
  inShoppingCart = false;
  disabled;

  constructor( private service: ProductService,
               private router: ActivatedRoute,
               private userService: UserService,
               private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.id = id;
        this.getProduct(this.id);
      }
    );

    this.userService.isFavourite(this.id).subscribe({
      next: value => this.favourite = value
    });

    this.userService.isRated(this.id).subscribe({
      next: value => this.givenFeedback = value
    });

    this.shoppingCartService.isInShoppingCart(this.id).subscribe({
      next: value => this.inShoppingCart = value
    });
  }

  getProduct(id: number): void {
    if (id !== 0) {
      this.service.getProductById(id).subscribe({
        next: productt => {
            this.product = productt;
            this.disabled = productt.quantity === 0.0;
        },
        error: err => this.errorMessage = err
      });
    } else {
      this.product = new Product();
    }
  }

  toggleFavourite(): void {
    if (this.favourite) {
        this.userService.removeFromFavourites(this.id).subscribe({
        next: () => {
          this.favourite = !this.favourite;
        }
      });
    } else {
      this.userService.addToFavourites(this.id).subscribe({
        next: () => {
          this.favourite = !this.favourite;
        }
      });
    }
  }

  toggleFeedback(): void {
    if (this.givenFeedback) {
      this.userService.unrateProduct(this.id).subscribe({
        next: () => {
          this.givenFeedback = !this.givenFeedback;
          this.ngOnInit();
        }
      });
    } else {
      this.userService.rateProduct(this.id).subscribe({
        next: () => {
          this.givenFeedback = !this.givenFeedback;
          this.ngOnInit();
        }
      });
    }
  }

  toggleProductShoppingCart(): void {
    if (this.inShoppingCart) {
      this.shoppingCartService.removeProductFromShoppingCart(this.id).subscribe({
        next: () => this.ngOnInit()
      });
    } else {
      this.shoppingCartService.addProductToShoppingCart(this.id, -1).subscribe({
        next: () => this.ngOnInit()
      });
    }
  }


}
