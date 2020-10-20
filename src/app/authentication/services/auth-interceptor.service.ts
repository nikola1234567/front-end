import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const addAuthorization = localStorage.getItem('jwt') != null ? localStorage.getItem('jwt') : '';
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${addAuthorization}`
      }
    });

    return next.handle(tokenizedReq);
  }
}
