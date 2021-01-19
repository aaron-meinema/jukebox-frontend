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
    this.getAccessToken(this.username, this.password);
  }

  public getAccessToken(username: string, password: string): void {
    const response = this.service.login(username, password);
    console.log(response);
  }

}
