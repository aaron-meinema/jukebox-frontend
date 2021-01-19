import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {

  }

  public login(username: string, password: string): void {
    this.http.post(`${environment.API_URL}users/login`, {username, password}).subscribe(
      (response: Response) => {
        this.setToken(response['token']);
        console.log(response);
        this.router.navigate(['player']);
      },
      (error: HttpErrorResponse) => console.log(error)
    );
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    return localStorage.setItem('token', token);
  }
}
