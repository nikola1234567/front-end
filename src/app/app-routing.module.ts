import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './welcome/welcome/welcome.component';
import {AdminManagmentComponent} from './admin/admin-managment/admin-managment.component';
import {AddEditComponent} from './products/components/add-edit/add-edit.component';
import { AdminViewProductsComponent } from './products/components/admin-view-products/admin-view-products.component';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { ProductUserSectionComponent } from './products/components/product-user-section/product-user-section.component';
import { RegisterInComponent } from './authentication/register-in/register-in.component';
import { LogInComponent } from './authentication/log-in/log-in.component';
import { UserUiComponent } from './user-ui/user-ui/user-ui.component';
import { ProfileComponent } from './user-ui/profile/profile.component';
import { FavouritesComponent } from './user-ui/favourites/favourites.component';
import { ShoppingCartComponent } from './user-ui/shopping-cart/shopping-cart.component';
import { PastTransactionsComponent } from './user-ui/past-transactions/past-transactions.component';
import { EditProfileComponent } from './user-ui/edit-profile/edit-profile.component';


const routes: Routes = [
  {
    path: 'user-ui', component: UserUiComponent,
    children: [
      {path: '', redirectTo: '/user-ui/profile', pathMatch: 'full'},
      {path: 'profile', component: ProfileComponent},
      {path: 'favourites', component: FavouritesComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'past-transactions', component: PastTransactionsComponent},
      {path: 'edit-profile', component: EditProfileComponent}
    ]
  },
  {path: 'welcome', component: WelcomeComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {
    path: 'admin-managment', component: AdminManagmentComponent,
    children: [
      {path: 'products/add-edit/:id', component: AddEditComponent},
      {path: 'products', component: AdminViewProductsComponent}
    ]
  },
  {path: 'product-detail/:id', component: ProductDetailComponent},
  {path: 'user-products-view', component: ProductUserSectionComponent},
  {path: 'register', component: RegisterInComponent},
  {path: 'log-in', component: LogInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
