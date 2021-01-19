import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(public loginService: LoginService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.loginService.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.loginService.getToken()}`
        }
      });
    } else if (request.url.endsWith('signup')) {
      // intended empty block
    }
    return next.handle(request);
  }
}
