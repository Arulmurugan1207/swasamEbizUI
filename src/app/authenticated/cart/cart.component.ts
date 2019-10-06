import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonServices } from '../../shared/common.services'; import { Observable } from 'rxjs/Observable';
declare var $: any;
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit , OnDestroy {

  constructor( private commonService: CommonServices,
               private router: Router,
               private authservice: AuthenticationService,
               private route: ActivatedRoute

    ) { }

  cartlist: any = [];
  pickedbook: any = {};
  cartcount;
  totalAmount = 0;
  isUserLogged = false;
  allData: any = {};
  orderId: any;
  isMyOrder = false;
  onPickedBookget(bookid) {
    this.pickedbook = this.cartlist.filter(function(item) {
      return item.id == bookid;
    });
    this.pickedbook = this.pickedbook[0];
  }

  onItemDeleted(index: number) {
    this.commonService.cartList.splice(index, 1);
    this.cartlist = this.commonService.cartList;
    this.commonService.emitCartCOunt();
    this.commonService.cartbooksids = this.commonService.cartList.map(a => a.id);
  }
  postData() {
    console.log('posted');
    this.allData.totalAmount = this.totalAmount;
    this.allData.cartList = this.cartlist;
    const tempUser = JSON.parse(localStorage.getItem('currentUser'));
    this.allData.userId = tempUser._id;
    console.log(this.allData);
    if (this.allData.cartList.length > 0) {
      this.commonService.postNewOrder(this.allData)
    .subscribe((response: any) => {
      console.log(response);
      this.orderId = response.orderId;
      $('#orderSuccessModal').modal('show');
      this.commonService.cartList = [];
    });
    }
  }
  decreaseQuantity(index: number) {
    if (this.commonService.cartList[index].quanitity > 1) {
      // tslint:disable-next-line: radix
      this.commonService.cartList[index].quanitity = (parseInt(this.commonService.cartList[index].quanitity) - 1).toString();
      this.cartlist = this.commonService.cartList;
      this.totalAmount = this.commonService.sum(this.commonService.cartList, 'price', 'quanitity');
      this.commonService.emitCartCOunt();
      this.commonService.cartbooksids = this.commonService.cartList.map(a => a.id);
    }

  }
  increaseQuantity(index: number) {
    // tslint:disable-next-line: radix
    if (parseInt(this.commonService.cartList[index].quanitity) < parseInt(this.commonService.cartList[index].availablequantity)) {
    // tslint:disable-next-line: radix
    const num = (parseInt(this.commonService.cartList[index].quanitity) + 1).toString();
    this.commonService.cartList[index].quanitity = num;
    // tslint:disable-next-line: max-line-length
    // this.commonService.cartList[index].price = parseInt(this.commonService.cartList[index].price)*this.commonService.cartList[index].quanitity;
    this.cartlist = this.commonService.cartList;
    this.totalAmount = this.commonService.sum(this.commonService.cartList, 'price', 'quanitity');
    this.commonService.emitCartCOunt();
    this.commonService.cartbooksids = this.commonService.cartList.map(a => a.id);
    this.commonService.showCartAlert();
  }
  }
  redirectToLogin() {
    if (this.isUserLogged) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: this.router.url
        }
      });
      return false;
    }
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (Object.keys(params).length > 0) {
        const orderId: any = params.orderId;
        if (orderId === '' || orderId) {
          this.isMyOrder = true;
          this.orderId = orderId;
        } else {
          this.isMyOrder = false;
        }
      }
    });
    this.isUserLogged = this.authservice.loggedIn;
    if ( !this.isMyOrder) {
    this.cartlist = this.commonService.cartList;
    this.totalAmount = this.commonService.sum(this.commonService.cartList, 'price', 'quanitity');
    console.log(this.cartlist);
    console.log(this.commonService.cartbooksids);
    this.commonService.cartCount.subscribe(count => {
     this.cartcount = count;
   });
    this.commonService.emitCartCOunt();
  } else {
    this.commonService.isLoading.emit(true);
    this.commonService.getOneOrder(this.orderId)
    .subscribe((response: any) => {
      this.cartlist = response.cartList;
      this.totalAmount = response.totalAmount;
      this.commonService.isLoading.emit(false);
    });
  }
  }
  ngOnDestroy() {
    $('#orderSuccessModal').modal('hide');
  }
}
