import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  public registrationForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]]
    });
  }
  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const upperCharacterRegex: RegExp = /(?=.*[A-Z])/;
    const lowerCharacterRegex: RegExp = /(?=.*[a-z])/;
    const digitRegex: RegExp = /(?=.*\d)/;
    const specialCharacterRegex: RegExp = /[-+_!@#$%^&*.,?]/;
    let validatorResponse = {};
    const passwordValue = control.value;

    if (passwordValue !== null) {
      if (!passwordValue.match(upperCharacterRegex)) {
        validatorResponse['uppercaseCharacterError'] = true;
      }
      if (!passwordValue.match(lowerCharacterRegex)) {
        validatorResponse['lowercaseCharacterError'] = true;
      }
      if (!passwordValue.match(digitRegex)) {
        validatorResponse['numberError'] = true;
      }
      if (!passwordValue.match(specialCharacterRegex)) {
        validatorResponse['specialCharacterError'] = true;
      }
      if (passwordValue.length < 8) {
        validatorResponse['minlength'] = true;
      }
    }
    return validatorResponse;
  }
  submitForm() {}
}
