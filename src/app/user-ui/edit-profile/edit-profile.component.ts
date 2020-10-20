import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ProfilePictureComponent } from 'src/app/shared/profile-picture/profile-picture.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User;
  imagePath: string;
  public imagePath1;
  selectedImage: File;


  constructor(private service: UserService, private router: Router, private profilePic: ProfilePictureComponent) { }

  ngOnInit() {
    this.service.getUser().subscribe({
      next: value => {
        this.user = value;
        this.imagePath = this.user.image == null ? '../../assets/images/profile.jpg' : this.user.image.base64format;
        console.log(this.imagePath);
      }
    });
  }

  onFileChange(event) {
    this.selectedImage = null;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImage = file;
    }
  }

  saveImage(): void {
    if (this.selectedImage != null) {
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      this.service.changePicture(formData).subscribe({
        next: () => {
          location.reload();
        }
      });
    }
  }

  save(): void {
    this.service.updateUser(this.user).subscribe({
      next: value => {
        this.user = value;
        location.reload();
      }
    });
  }

}
