import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from './authentication/services/auth.service';
import { User } from './models/user';
import { UserService } from './user-ui/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Online Clothing Shop';
  name = '';
  user: User;
  imagePath: string;

  constructor(private authService: AuthService, private router: Router, private socialService: SocialAuthService) {}
  ngOnInit(): void {
  }

  logOut(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleName');
    if (localStorage.getItem('type') === 'SOCIAL_LOGIN') {
      this.socialService.signOut();
    }
    localStorage.removeItem('type');
    this.router.navigate(['/welcome']);
  }
}
