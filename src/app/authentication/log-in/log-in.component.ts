import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { debounceTime } from 'rxjs/operators';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { TokenDto } from 'src/app/models/token-dto';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;
  usernamemessage: string;
  passwordmessage: string;
  errormessage: string;

  socialUser: SocialUser;
  // userLogged: SocialUser;
  // isLogged: boolean;

  private validatorMessages = {
    usernamerequired: 'You must provide a username to log in.',
    passwordrequired: 'You must provide a password to log in.'
  };

  constructor(private fb: FormBuilder, private service: AuthService, private router: Router, private authService: SocialAuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    const usernameControl = this.loginForm.get('username');
    usernameControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setUsernameMessage(usernameControl)
    );

    const passwordControl = this.loginForm.get('password');
    passwordControl.valueChanges.pipe(debounceTime(1000)).subscribe(
      value => this.setPasswordMessage(passwordControl)
    );

    // this.authService.authState.subscribe(
    //   data => {
    //     this.userLogged = data;
    //     this.isLogged = (this.userLogged != null);
    //   }
    // );
  }

  setUsernameMessage(c: AbstractControl): void {
    this.usernamemessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.usernamemessage = Object.keys(c.errors).map(
        key => this.validatorMessages['username' + key]
      ).join(' ');
    }
  }

  setPasswordMessage(c: AbstractControl): void {
    this.passwordmessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordmessage = Object.keys(c.errors).map(
        key => this.validatorMessages['password' + key]
      ).join(' ');
    }
  }

  login(): void {
    if (this.loginForm.touched) {
      if (this.loginForm.dirty && this.loginForm.valid) {
        const authRequest = new AuthenticationRequest();
        authRequest.username = this.loginForm.get('username').value;
        authRequest.password = this.loginForm.get('password').value;

        this.service.logInUser(authRequest).subscribe({
          next: value => {
            localStorage.setItem('jwt', value.jwt);
            localStorage.setItem('userId', JSON.stringify(value.userId));
            localStorage.setItem('roleName', value.roles[0].roleName);
            localStorage.setItem('type', 'CLASSIC_LOGIN');
            this.onLogInComplete();
          },
          error: err => {
            this.usernamemessage = '';
            this.passwordmessage = '';

            if (err.includes('Username')) {
              this.usernamemessage = '';
              this.usernamemessage = err;
            }

            if (err.includes('password') || err.includes('credentials')) {
              this.passwordmessage = '';
              this.passwordmessage = err;
            }
          }
        });


      } else {
        this.errormessage = 'You must fill in the required fields in order to log in.';
        alert(this.errormessage);
      }
    } else {
      this.errormessage = 'You must fill in the fields in order to log in.';
      alert(this.errormessage);
    }
  }

  onLogInComplete(): void {
    this.loginForm.reset();
    this.router.navigate(['/user-products-view']);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        this.service.logInUserWithGoogle(new TokenDto(data.idToken)).subscribe({
          next: authResponse => {
            console.log(JSON.stringify(authResponse));
            localStorage.setItem('jwt', authResponse.jwt);
            localStorage.setItem('userId', JSON.stringify(authResponse.userId));
            localStorage.setItem('roleName', authResponse.roles[0].roleName);
            localStorage.setItem('type', 'SOCIAL_LOGIN');
            this.onLogInComplete();
          }
        });
      }
    );
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.service.logInUserWithFacebook(new TokenDto(data.authToken)).subscribe({
          next: authResponse => {
            localStorage.setItem('jwt', authResponse.jwt);
            localStorage.setItem('userId', JSON.stringify(authResponse.userId));
            localStorage.setItem('roleName', authResponse.roles[0].roleName);
            localStorage.setItem('type', 'SOCIAL_LOGIN');
            this.onLogInComplete();
          }
        });
      }
    );
  }

}
