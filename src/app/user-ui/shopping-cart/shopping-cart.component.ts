import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public hasActive;
  shoppingCart: ShoppingCart;
  cartItems: CartItem[];
  totalCost: number;
  name: string;
  description: string;

  public options = {
    position: ['bottom', 'right'],
    timeOut: 2000,
    animate: 'fade',
    showProgressBar: true
  };

  constructor(private shoppingCartService: ShoppingCartService, private router: Router, private fb: FormBuilder,
              private notificationService: NotificationsService) { }

  ngOnInit() {
    this.shoppingCartService.hasActiveShoppingCart().subscribe({
      next: value => {
        this.hasActive = value;
        this.hasActiveCartOnComplete();
      }
    });
  }

  addProduct(id: number, value: number): void {
    this.shoppingCartService.addProductToShoppingCart(id, value).subscribe({
      next: () => this.ngOnInit()
    });
  }

  hasActiveCartOnComplete(): void {
    if (this.hasActive) {
      this.shoppingCartService.getFixedOrderProducts().subscribe({
        next: value => this.cartItems = value
      });
      this.shoppingCartService.getActiveShoppingCart().subscribe({
        next: value => this.shoppingCart = value
      });
      this.shoppingCartService.getTotalCost().subscribe({
        next: value => this.totalCost = value
      });
    }
  }

  onClickShoppingCart(): void {
    if (this.hasActive) {
      this.ngOnInit();
    } else {
      this.shoppingCartService.createNewShoppingCart().subscribe({
        next: () => this.ngOnInit()
      });
    }
  }

  cancelShoppingCart(): void {
    this.shoppingCartService.cancelShoppingCart().subscribe({
      next: () => this.ngOnInit()
    });
  }

  removeProduct(id: number): void {
    this.shoppingCartService.removeProductFromShoppingCart(id).subscribe({
      next: () => this.ngOnInit()
    });
  }

  showPopUpBar(value: string): void {
    if (value === 'success') {
      this.notificationService.success('Transaction confirmed', ' action completed successfully');
    } else {
      this.notificationService.error('Transaction canceled', ' action completed successfully');
    }
    this.ngOnInit();
  }


}
