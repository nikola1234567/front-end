import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationResponse } from 'src/app/models/authentication-response';


const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userUrl = 'server/api/users';
  private authUrl = 'server/api/authenticate';

  constructor(private http: HttpClient) { }

  existsByUsername(username: string): Observable<boolean> {
    const url = `${this.userUrl}/exists/${username}`;
    return this.http.get<boolean>(url, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  createUser(p: any): any {
    return this.http.post(this.userUrl, p, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  logInUser(p: any): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.authUrl, p, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  logInUserWithFacebook(p: any): Observable<AuthenticationResponse> {
    const url = `${this.authUrl}/social-login/facebook`;
    return this.http.post<AuthenticationResponse>(url, p, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  logInUserWithGoogle(p: any): Observable<AuthenticationResponse> {
    const url = `${this.authUrl}/social-login/google`;
    return this.http.post<AuthenticationResponse>(url, p, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = ' ';
    if (err.error instanceof ErrorEvent) {
      // error na stranat na clientot ili so mrezata
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      // back-end error
      errorMessage = `${err.error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  loggedInWithClassicLogin(): boolean {
    return !!localStorage.getItem('jwt') && localStorage.getItem('type') === 'CLASSIC_LOGIN';
  }

  loggedInWithSocialLogin(): boolean {
    return !!localStorage.getItem('jwt') && localStorage.getItem('type') === 'SOCIAL_LOGIN';
  }

  isAdmin(): boolean {
    return localStorage.getItem('roleName') === 'ROLE_ADMIN';
  }
}
