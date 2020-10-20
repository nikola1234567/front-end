import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart-item';
import { ShoppingCart } from 'src/app/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingCartUrl = 'server/api/shopping-cart';

  constructor(private http: HttpClient) { }

  hasActiveShoppingCart(): Observable<boolean> {
    const url = `${this.shoppingCartUrl}/exists-active/${localStorage.getItem('userId')}`;
    return this.http.get<boolean>(url);
  }

  getTotalCost(): Observable<number> {
    const url = `${this.shoppingCartUrl}/total-cost/${localStorage.getItem('userId')}`;
    return this.http.get<number>(url);
  }

  isInShoppingCart(productId: number): Observable<boolean> {
    const url = `${this.shoppingCartUrl}/is-in-shopping-cart/${localStorage.getItem('userId')}/${productId}`;
    return this.http.get<boolean>(url);
  }

  getActiveShoppingCart(): Observable<ShoppingCart> {
    const url = `${this.shoppingCartUrl}/get-active/${localStorage.getItem('userId')}`;
    return this.http.get<ShoppingCart>(url);
  }

  createNewShoppingCart(): Observable<ShoppingCart> {
    const url = `${this.shoppingCartUrl}/create/${localStorage.getItem('userId')}`;
    return this.http.post<ShoppingCart>(url, null)
    .pipe(
      catchError(this.handleError)
    );
  }

  cancelShoppingCart(): Observable<ShoppingCart> {
    const url = `${this.shoppingCartUrl}/cancel/${localStorage.getItem('userId')}`;
    return this.http.patch<ShoppingCart>(url, null)
    .pipe(
      catchError(this.handleError)
    );
  }

  addProductToShoppingCart(productId: number, value: number): Observable<ShoppingCart> {
    const url = `${this.shoppingCartUrl}/add-product/${productId}/${localStorage.getItem('userId')}/${value}`;
    return this.http.patch<ShoppingCart>(url, null);
  }

  removeProductFromShoppingCart(productId: number): Observable<ShoppingCart> {
    const url = `${this.shoppingCartUrl}/remove-product/${productId}/${localStorage.getItem('userId')}`;
    return this.http.patch<ShoppingCart>(url, null);
  }

  getFixedOrderProducts(): Observable<CartItem[]> {
    const url = `${this.shoppingCartUrl}/products-fixed-order/${localStorage.getItem('userId')}`;
    return this.http.get<CartItem[]>(url);
  }

  // tslint:disable-next-line:typedef
  private handleError(err: HttpErrorResponse) {
    let errorMessage = ' ';
    if (err.error instanceof ErrorEvent) {
      // error na stranat na clientot ili so mrezata
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // back-end error
      errorMessage = `${err.error.message}`;
    }
    return throwError(errorMessage);
  }


}
