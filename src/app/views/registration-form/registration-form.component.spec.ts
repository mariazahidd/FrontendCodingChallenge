import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, Validators } from '@angular/forms';

import { RegistrationFormComponent } from './registration-form.component';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder],
      declarations: [RegistrationFormComponent]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormComponent);
    formBuilder = TestBed.get(FormBuilder);
    component = fixture.componentInstance;
    component.registrationForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), component.passwordValidator]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.registrationForm.valid).toBeFalse();
  });

  it('submit button should be disabled when form is invalid', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.button-disable')).toBeTruthy();
  });

  it('email should be invalid', () => {
    const email = component.registrationForm.controls['email'];
    expect(email.valid).toBeFalse();
    email.setValue('');
    expect(email.hasError('required')).toBeTrue();
    email.setValue('hh75');
    expect(email.valid).toBeFalse();
  });

  it('email should be valid', () => {
    const email = component.registrationForm.controls['email'];
    email.setValue('hh75@gmail.com');
    expect(email.valid).toBeTrue();
  });

  it('password should be invalid', () => {
    const password = component.registrationForm.controls['password'];
    expect(password.valid).toBeFalse();
    password.setValue('');
    expect(password.hasError('required')).toBeTrue();
  });


  it('8+ characters', () => {
    const password = component.registrationForm.controls['password'];
    password.setValue('u');
    expect(password.hasError('minlength')).toBeTrue();
    password.setValue('e35tyt7j');
    expect(password.hasError('minlength')).toBeFalse();
  });

  it('upper case letter', () => {
    const password = component.registrationForm.controls['password'];
    password.setValue('m98ng@gk');
    expect(password.hasError('uppercaseCharacterError')).toBeTrue();
    password.setValue('m98ng@gM');
    expect(password.hasError('uppercaseCharacterError')).toBeFalse();
  });

  it('lower case letter', () => {
    const password = component.registrationForm.controls['password'];
    password.setValue('M988JK@');
    expect(password.hasError('lowercaseCharacterError')).toBeTrue();
    password.setValue('m98ng@gM');
    expect(password.hasError('uppercaseCharacterError')).toBeFalse();
  });

  it('special character', () => {
    const password = component.registrationForm.controls['password'];
    password.setValue('M988nJK');
    expect(password.hasError('specialCharacterError')).toBeTrue();
    password.setValue('m98ng@gM');
    expect(password.hasError('specialCharacterError')).toBeFalse();
  });

  it('number', () => {
    const password = component.registrationForm.controls['password'];
    password.setValue('MnJK@ngy');
    expect(password.hasError('numberError')).toBeTrue();
    password.setValue('m98ng@gM');
    expect(password.hasError('numberError')).toBeFalse();
  });

  it('password should valid', () => {
    const password = component.registrationForm.controls['password'];
    password.setValue('m98ng@gM');
    expect(password.valid).toBeTrue();
  });

  it('form should be valid', () => {
    const email = component.registrationForm.controls['email'];
    email.setValue('hh75@gmail.com');
    const password = component.registrationForm.controls['password'];
    password.setValue('m98ng@gM');
    expect(component.registrationForm.valid).toBeTrue();
  });
});
