import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/Rx';
import 'bxslider';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { OffersComponent } from './offers/offers.component';
import { CustomersComponent } from './customers/customers.component';
import { GiftfinderComponent } from './giftfinder/giftfinder.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CommonServices } from './shared/common.services';
import { WINDOW_PROVIDERS } from './shared/window.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BooksListComponent } from './books/books-list/books-list.component';
import { FiltersComponent } from './filters/filters.component';
import { HotDealsComponent } from './home/hot-deals/hot-deals.component';
import { BestBookOfMonthComponent } from './home/best-book-of-month/best-book-of-month.component';
import { MostWishedBooksComponent } from './home/most-wished-books/most-wished-books.component';
import { NewReleasesComponent } from './home/new-releases/new-releases.component';
import { CartComponent } from './authenticated/cart/cart.component';
import { WhishlistComponent } from './authenticated/whishlist/whishlist.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-gaurd.service';
import { AuthenticationService } from './auth.service';
import { RegisterComponent } from './register/register.component';
import { PagerService } from './shared/pager.service';
import { NgImageSliderModule } from 'ng-image-slider';
import { InfoComponent } from './info/info.component';
import { MyordersComponent } from './authenticated/myorders/myorders.component';
import { MyaccountComponent } from './authenticated/myaccount/myaccount.component';
import { CheckPasswordDirective } from './shared/validator.directive';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BooksComponent,
    OffersComponent,
    CustomersComponent,
    GiftfinderComponent,
    AboutusComponent,
    ContactusComponent,
    BooksListComponent,
    FiltersComponent,
    HotDealsComponent,
    BestBookOfMonthComponent,
    MostWishedBooksComponent,
    NewReleasesComponent,
    CartComponent,
    WhishlistComponent,
    LoginComponent,
    RegisterComponent,
    InfoComponent,
    MyordersComponent,
    MyaccountComponent,
    CheckPasswordDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularSvgIconModule,
    NgImageSliderModule
  ],
  providers: [CommonServices,
    WINDOW_PROVIDERS,
    AuthGuard,
    AuthenticationService,
    PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
