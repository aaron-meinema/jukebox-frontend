import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {SignupService} from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private service: SignupService) {
  }

  ngOnInit(): void {
    this.signUp(this.username, this.password);
  }

  public signUp(username: string, password: string): void {
    const response = this.service.signup(username, password);
    console.log(response);
  }
}
