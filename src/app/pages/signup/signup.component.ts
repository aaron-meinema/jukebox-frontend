import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {SignupService} from './signup.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;

  constructor(private service: SignupService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null],
      password: [null],
      role: [null]
    });
  }

  public signUp(): void {
    this.service.signup(this.form);

  }
}
