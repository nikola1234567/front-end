import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'server/api/users';

  constructor(private http: HttpClient) { }

  addToFavourites(productId: number): Observable<User> {
    const url = `${this.userUrl}/add-fave/${localStorage.getItem('userId')}/${productId}`;
    return this.http.get<User>(url);
  }

  removeFromFavourites(productId: number): Observable<User> {
    const url = `${this.userUrl}/remove-fave/${localStorage.getItem('userId')}/${productId}`;
    return this.http.get<User>(url);
  }

  isFavourite(productId: number): Observable<boolean> {
    const url = `${this.userUrl}/is-fave/${localStorage.getItem('userId')}/${productId}`;
    return this.http.get<boolean>(url);
  }

  rateProduct(productId: number): Observable<{}> {
    const url = `${this.userUrl}/rate-product/${localStorage.getItem('userId')}/${productId}`;
    return this.http.get<{}>(url);
  }

  unrateProduct(productId: number): Observable<{}> {
    const url = `${this.userUrl}/unrate-product/${localStorage.getItem('userId')}/${productId}`;
    return this.http.get<{}>(url);
  }

  isRated(productId: number): Observable<boolean> {
    const url = `${this.userUrl}/is-rated/${localStorage.getItem('userId')}/${productId}`;
    return this.http.get<boolean>(url);
  }
}
