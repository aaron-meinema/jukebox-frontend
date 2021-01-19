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
  }

  public signUp(): void {
    this.service.signup(this.username, this.password);
  }
}
