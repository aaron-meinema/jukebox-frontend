import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(private service: LoginService) {
  }

  ngOnInit(): void {
  }

  public login(): void {
    this.service.login(this.username, this.password);
  }
}
