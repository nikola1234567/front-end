import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Input() rating: number;
  starWidth: number;


  constructor() { }

  ngOnInit(): void {
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
  }

}
