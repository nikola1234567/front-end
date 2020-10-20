import { keyframes } from '@angular/animations';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { UserDto } from 'src/app/models/user-dto';
import { AuthService } from '../services/auth.service';

function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmpassword');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }

  return { match: true};
}

@Component({
  selector: 'app-register-in',
  templateUrl: './register-in.component.html',
  styleUrls: ['./register-in.component.css']
})
export class RegisterInComponent implements OnInit {

  registerForm: FormGroup;
  namemessage: string;
  surnamemessage: string;
  emailmessage: string;
  usernamemessage: string;
  passwordmessage: string;
  confirmpasswordmessage: string;
  errorSubmitMessage: string;

  private validatorsMessages = {
    namerequired: 'You must enter your name.',
    nameminlength: 'You must include at least 3 charachters in your name.',
    surnamerequired: 'You must enter your surname.',
    surnameminlength: 'You must include at least 3 charachters in your surname.',
    emailrequired: 'You must provide email address.',
    emailemail: 'You must provide a valid email address. Valid email format: ***@***.com .',
    usernamerequired: 'You must provide a username.',
    usernameusername: 'That username is already taken.',
    passwordrequired: 'You must provide a password.',
    confirmpasswordrequired: 'You must confirm your password here.',
    confirmpasswordmatch: 'The password you have entered does not match.'
  };

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required]],
        confirmpassword: ['', [Validators.required]]
      }, {validators: passwordMatcher})
    });

    const nameControl = this.registerForm.get('name');
    nameControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setNameMessage(nameControl)
    );

    const surnameControl = this.registerForm.get('surname');
    surnameControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setSurnameMessage(surnameControl)
    );

    const emailControl = this.registerForm.get('email');
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setEmailMessage(emailControl)
    );

    const usernameControl = this.registerForm.get('username');
    usernameControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setUsernameMessage(usernameControl)
    );

    const passwordControl = this.registerForm.get('passwordGroup').get('password');
    passwordControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setPasswordMessage(passwordControl)
    );

    const confirmpasswordControl = this.registerForm.get('passwordGroup').get('confirmpassword');
    confirmpasswordControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setConfirmPasswordMessage(confirmpasswordControl)
    );

    const passwordGroupControl = this.registerForm.get('passwordGroup');
    passwordGroupControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setConfirmPasswordMessage(passwordGroupControl)
    );

  }

  setConfirmPasswordMessage(c: AbstractControl): void {
    this.confirmpasswordmessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.confirmpasswordmessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['confirmpassword' + key]
      ).join(' ');
    }
  }

  setPasswordMessage(c: AbstractControl): void {
    this.passwordmessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordmessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['password' + key]
      ).join(' ');
    }
  }

  setUsernameMessage(c: AbstractControl): void {
    this.usernamemessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.usernamemessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['username' + key]
      ).join(' ');
    }

    this.authService.existsByUsername(c.value).subscribe({
      next: value => this.existsByUsername(value)
    });
  }

  existsByUsername(postoi: boolean): void {
    if (postoi) {
      this.usernamemessage = this.validatorsMessages.usernameusername;
    }
  }


  setEmailMessage(c: AbstractControl): void {
    this.emailmessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailmessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['email' + key]
      ).join(' ');
    }
  }

  setSurnameMessage(c: AbstractControl): void {
    this.surnamemessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.surnamemessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['surname' + key]
      ).join(' ');
    }
  }

  setNameMessage(c: AbstractControl): void {
    this.namemessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.namemessage = Object.keys(c.errors).map(
        key => this.validatorsMessages['name' + key]
      ).join(' ');
    }
  }

  save(): void {
    if (this.registerForm.touched) {
      if (this.registerForm.dirty && this.registerForm.valid) {
        // tslint:disable-next-line:no-unused-expression
        UserDto; const p = new UserDto();
        p.name = this.registerForm.get('name').value;
        p.surname = this.registerForm.get('surname').value;
        p.email = this.registerForm.get('email').value;
        p.username = this.registerForm.get('username').value;
        p.password = this.registerForm.get('passwordGroup').get('password').value;
        this.authService.createUser(p).subscribe({
          next: () => {
            alert('Successfully registered!!!');
            this.onSaveComplete();
          }
        });
      } else {
        this.errorSubmitMessage = 'Please make sure that all fields are filled and correctly entered!!!';
        alert(this.errorSubmitMessage);
      }
    } else {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.registerForm.reset();
    this.router.navigate(['/log-in']);
  }

}
