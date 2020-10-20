import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  imagePath: string;

  constructor(private service: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.service.getUser().subscribe({
      next: value => {
        this.user = value;
        this.imagePath = this.user.image == null ? '../../assets/images/profile.jpg' : this.user.image.base64format;
        console.log(this.imagePath);
      }
    });
  }

}
