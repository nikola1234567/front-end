import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/user-ui/services/user.service';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {

  user: User;
  imagePath: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser().subscribe({
      next: value => {
        this.user = value;
        this.imagePath = this.user.image == null ? '../../assets/images/profile.jpg' : this.user.image.base64format;
      }
    });
  }

}
