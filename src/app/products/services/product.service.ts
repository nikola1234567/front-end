import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, from, throwError} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';
import {Product} from 'src/app/models/product';
import {ProductDto} from 'src/app/models/product-dto';
import { FormGroup } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'server/api/products';

  constructor(private http: HttpClient) {
  }


  createProduct(formData: FormData): Observable<any> {
    return this.http.post(this.productUrl, formData)
      .pipe(
        // tap(data => console.log('Create Product: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProducts(): Observable<any> {
    const url = `${this.productUrl}/all`;
    return this.http.get(url, httpOptions).pipe(
      // tap(data => console.log('ALL ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getActiveProducts(): Observable<any> {
    const url = `${this.productUrl}`;
    return this.http.get(url, httpOptions).pipe(
      // tap(data => console.log('ALL ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<any> {
    const url = `${this.productUrl}/${id}`;
    return this.http.get(url, httpOptions).pipe(
      // tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateProduct(formData: FormData, id: number): Observable<any> {
    const url = `${this.productUrl}/${id}`;
    return this.http.put(url, formData)
      .pipe(
        // tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
   }

  removeProduct(id: number): Observable<{}> {
    const url = `${this.productUrl}/remove-product/${id}`;
    return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<{}> {
    const url = `${this.productUrl}/${id}`;
    return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  activateProduct(id: number): Observable<{}> {
    const url = `${this.productUrl}/${id}`;
    return this.http.patch(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  giveFeedback(id: number): Observable<{}> {
    const url = `${this.productUrl}/product-give-feedback/${id}`;
    return this.http.patch(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  takeFeedback(id: number): Observable<{}> {
    const url = `${this.productUrl}/product-take-feedback/${id}`;
    return this.http.patch(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  filterProducts(filter: FormGroup): Observable<any> {
    const url = `${this.productUrl}/advance-filter/${filter.get('order').value}`;
    return this.http.get(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  // tslint:disable-next-line:typedef
  private handleError(err: HttpErrorResponse) {
    let errorMessage = ' ';
    if (err.error instanceof ErrorEvent) {
      // error na stranat na clientot ili so mrezata
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // back-end error
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
