import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {
  }

  public signup(username: string, password: string): void {
    this.http.post(`${environment.API_URL}users/signup`, {username, password}).subscribe();
  }
}
