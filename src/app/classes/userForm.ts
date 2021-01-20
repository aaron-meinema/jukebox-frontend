import {FormGroup} from '@angular/forms';

export class UserForm {
  username: string;
  password: string;
  role: string;

  constructor(form: FormGroup) {
    this.username = form.get('username').value;
    this.password = form.get('password').value;
    this.role = form.get('role').value;
  }
}
