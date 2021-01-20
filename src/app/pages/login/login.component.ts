import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private service: LoginService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null],
      password: [null],
      role: [null]
    });
  }

  public login(): void {
    this.service.login(this.form);
  }
}
