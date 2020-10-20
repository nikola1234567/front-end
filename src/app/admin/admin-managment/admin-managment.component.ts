import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin-managment',
  templateUrl: './admin-managment.component.html',
  styleUrls: ['./admin-managment.component.css']
})
export class AdminManagmentComponent implements OnInit {

  isOn = true;

  constructor() {
  }

  ngOnInit() {
  }

  toggleClass(): void {
    this.isOn = !this.isOn;
  }

}
