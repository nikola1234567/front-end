import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome/welcome.component';
import {AdminManagmentComponent} from './admin/admin-managment/admin-managment.component';
import {AddEditComponent} from './products/components/add-edit/add-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminViewProductsComponent } from './products/components/admin-view-products/admin-view-products.component';
import { StarComponent } from './shared/star/star.component';
import { FormsModule } from '@angular/forms';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ProductDetailComponent } from './products/components/product-detail/product-detail.component';
import { ProductUserSectionComponent } from './products/components/product-user-section/product-user-section.component';
import { RegisterInComponent } from './authentication/register-in/register-in.component';
import { LogInComponent } from './authentication/log-in/log-in.component';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { AuthInterceptor } from './authentication/services/auth-interceptor.service';
import { UserUiComponent } from './user-ui/user-ui/user-ui.component';
import { ProfileComponent } from './user-ui/profile/profile.component';
import { FavouritesComponent } from './user-ui/favourites/favourites.component';
import { ShoppingCartComponent } from './user-ui/shopping-cart/shopping-cart.component';
import { PastTransactionsComponent } from './user-ui/past-transactions/past-transactions.component';
import { EditProfileComponent } from './user-ui/edit-profile/edit-profile.component';
import { ProfilePictureComponent } from './shared/profile-picture/profile-picture.component';
import { NoShoppingCartComponent } from './shared/no-shopping-cart/no-shopping-cart.component';
import { ModalComponent } from './payment/components/modal/modal.component';
import { PaymentUiComponent } from './payment/components/payment-ui/payment-ui.component';

import { NgxStripeModule } from 'ngx-stripe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageSliderComponent } from './welcome/image-slider/image-slider.component';
import { WelcomeSectionComponent } from './welcome/welcome-section/welcome-section.component';
import { SocialLinksComponent } from './welcome/social-links/social-links.component';
import { FooterComponent } from './footer/footer.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    AdminManagmentComponent,
    AddEditComponent,
    AdminViewProductsComponent,
    StarComponent,
    DateFormatPipe,
    ProductDetailComponent,
    ProductUserSectionComponent,
    RegisterInComponent,
    LogInComponent,
    UserUiComponent,
    ProfileComponent,
    FavouritesComponent,
    ShoppingCartComponent,
    PastTransactionsComponent,
    EditProfileComponent,
    ProfilePictureComponent,
    NoShoppingCartComponent,
    ModalComponent,
    PaymentUiComponent,
    ImageSliderComponent,
    WelcomeSectionComponent,
    SocialLinksComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PasswordStrengthMeterModule,
    ModalModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NgxStripeModule.forRoot('pk_test_51H0AUpKlrDn4L6TppUjWu90nNVVYxLPfCctgG9DoaMIdMB4SSGbM4SIb1vvxldSyzw7f9k2TRGnZ2OnHYJFGXEO300ZAVYUir2'),
    SocialLoginModule
  ],
  entryComponents: [ModalComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, ProfilePictureComponent,
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '647139029513-qf8epdfrqckkrrhprvh8ni95m9mh7ka3.apps.googleusercontent.com'
          ),
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('337395054155734'),
        },
      ],
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
