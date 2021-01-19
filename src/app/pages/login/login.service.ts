import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {

  }

  public login(username: string, password: string): void {
    this.http.post(`${environment.API_URL}login`, {username, password}).subscribe(
      (response: Response) => localStorage.setItem('token', response['token']),
      (error: HttpErrorResponse) => console.log(error)
    );
  }
}
