import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserForm} from '../../classes/userForm';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {
  }

  public signup(form: FormGroup): void {
    this.http.post(`${environment.API_URL}users/signup`, new UserForm(form)).subscribe();
  }
}
