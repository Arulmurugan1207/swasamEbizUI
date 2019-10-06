import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { OffersComponent } from './offers/offers.component';
import { CustomersComponent } from './customers/customers.component';
import { GiftfinderComponent } from './giftfinder/giftfinder.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CartComponent } from './authenticated/cart/cart.component';
import { WhishlistComponent } from './authenticated/whishlist/whishlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth-gaurd.service';
import { HotDealsComponent } from './home/hot-deals/hot-deals.component';
import { BestBookOfMonthComponent } from './home/best-book-of-month/best-book-of-month.component';
import { MostWishedBooksComponent } from './home/most-wished-books/most-wished-books.component';
import { NewReleasesComponent } from './home/new-releases/new-releases.component';
import { InfoComponent } from './info/info.component';
import { MyordersComponent } from './authenticated/myorders/myorders.component';
import { MyaccountComponent } from './authenticated/myaccount/myaccount.component';


const appRoutes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'home/hot-deals', component: HotDealsComponent },
  { path: 'home/best-books-of-the-month', component: BestBookOfMonthComponent },
  { path: 'home/most-wished-books', component: MostWishedBooksComponent },
  { path: 'home/new-releases', component: NewReleasesComponent },
  { path: 'books', component: BooksComponent },
  { path: 'books/page/:page', component: BooksComponent },
  { path: 'text-books', component: OffersComponent },
  { path: 'ncert-books/class/:classId', component: BooksComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'giftfinder', component: GiftfinderComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'wishitems', canActivate: [AuthGuard], component: WhishlistComponent },
  { path: 'cartitems', component: CartComponent },
  { path: 'mycartitems', canActivate: [AuthGuard], component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'info', component: InfoComponent },
  { path: 'search', component: BooksComponent },
  { path: 'myOrders', component: MyordersComponent },
  { path: 'myOrders/:orderId', component: CartComponent },
  { path: 'myAccount', component: MyaccountComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [

  ]
})
export class AppRoutingModule { }
