import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {UserForm} from '../../classes/userForm';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {

  }

  public login(form: FormGroup): void {
    this.http.post(`${environment.API_URL}users/login`, new UserForm(form)).subscribe(
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
