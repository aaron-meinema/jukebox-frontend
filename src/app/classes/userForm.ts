import {FormGroup} from '@angular/forms';

export class UserForm {
  username: string;
  password: string;

  constructor(form: FormGroup) {
    this.username = form.get('username').value;
    this.password = form.get('password').value;
  }
}
