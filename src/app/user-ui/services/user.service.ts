import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'server/api/users';

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> {
    const url = `${this.userUrl}/${localStorage.getItem('userId')}`;
    return this.http.get<User>(url);
  }

  changePicture(p: FormData): Observable<{}> {
    const url = `${this.userUrl}/${localStorage.getItem('userId')}/image`;
    return this.http.post<{}>(url, p);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.userUrl}/${localStorage.getItem('userId')}`;
    return this.http.put<User>(url, user);
  }

  getFavourites(): Observable<Product[]> {
    const url = `${this.userUrl}/all-fave/${localStorage.getItem('userId')}`;
    return this.http.get<Product[]>(url);
  }


}
