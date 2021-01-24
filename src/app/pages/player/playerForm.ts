import {FormGroup} from '@angular/forms';

export class PlayerForm {
  file: File;

  constructor(form: FormGroup) {
    this.file = form.get('song').value;
  }
}
