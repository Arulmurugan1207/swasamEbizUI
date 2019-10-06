import { Component, HostListener, Inject, OnInit, DoCheck, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { Router, Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from './shared/window.service';
import { CommonServices } from './shared/common.services';
import { AuthenticationService } from './auth.service';
import { DebugRenderer2 } from '@angular/core/src/view/services';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window: Window,
    private router: Router,
    private commonService: CommonServices,
    private authservice: AuthenticationService,
    private cdRef : ChangeDetectorRef
  ) {

  }
  title = 'Look jQuery Animation working in action!';
  showLoader = false;
  cartcount = 0;
  wishcount = 0;
  isUserLogged = false;
  pickedbook: any = {};
  user: any = {};

  @HostListener('window:scroll', [])

  onWindowScroll() {
    let number = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
    if (number > 0) {
      const body = document.getElementsByTagName('body')[0];
      // body.classList.add('fixed');

    } else if (number < 10) {
      const body = document.getElementsByTagName('body')[0];
    // body.classList.remove('fixed');
    }
  }

  /*navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.isLoading = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.isLoading = false;
      }, 250);
      if (window.location.href.indexOf('/search') === -1) {
        $('#search').val('');
      }

    }

    / Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.isLoading = false;
    }
    if (event instanceof NavigationError) {
      this.isLoading = false;
    }
  }*/
  globalSearch(event) {
    const inputVal = $('#search').val();
    if (inputVal) {
      this.router.navigate(['/search'], {queryParams: {searchQuery: inputVal}});
    }
    console.log(event + '  ' + inputVal);
  }
  public ngOnInit()  {
    let cartList;
    if (cartList) {
      this.commonService.cartList = cartList;
    }

    this.router.events.subscribe((event: RouterEvent) => {
      //this.navigationInterceptor(event);
    });
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });

    this.commonService.cartCount.subscribe(count => {
    this.cartcount = count;

  });
    this.commonService.emitCartCOunt();
    this.commonService.emitPickedbook.subscribe(book => {
    this.pickedbook = book;
  });
    this.commonService.wishCount.subscribe(count => {
    this.wishcount = count;
  });
    this.authservice.emitUser.subscribe((user: any) => {
      if(user) {
        this.user = user;
        this.isUserLogged = this.authservice.loggedIn = true;
      } else {
        this.user = {};
        this.isUserLogged = this.authservice.loggedIn = false;
      }

  });
    const tempUser = localStorage.getItem('currentUser');
    this.user = JSON.parse(tempUser);
    if (this.user) {
    this.isUserLogged = this.authservice.loggedIn = true;
  }
    // tslint:disable-next-line: only-arrow-functions
    $(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
  }
  ngAfterViewChecked() {
    /*this.commonService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
    });*/
    this.commonService.isLoading.subscribe(isLoading => {
      this.showLoader = isLoading;
      this.cdRef.detectChanges();
    });
  }
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  // tslint:disable-next-line: one-line
  addToCartlist(){
    this.commonService.cartList.push(this.pickedbook);
    this.commonService.emitCartCOunt();
    this.commonService.cartbooksids = this.commonService.cartList.map(a => a.id);
    this.commonService.showCartAlert();
}
}
