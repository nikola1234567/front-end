import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/products/services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  filterProducts: Product[];

  constructor(private userService: UserService, private service: AuthService) { }

  ngOnInit() {
    this.userService.getFavourites().subscribe({
      next: products => {
        this.filterProducts = products;
        console.log(JSON.stringify(this.filterProducts));
      }
    });
  }

}
