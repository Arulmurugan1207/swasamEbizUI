import { Injectable, Output, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Options } from 'selenium-webdriver/edge';
import { environment } from '../../environments/environment';
declare var $ : any;


@Injectable()
export class CommonServices {
   valuesUrl: any = 'api/data/data.json';

  constructor(private http: HttpClient) {}

  allCleared = true;
  wishedbokids: any = [];
  cartbooksids: any = [];
  cartList: any = [];
  wishList: any = [];
  pickedbook: any = [];
  cartLength;
  changed: EventEmitter<boolean> = new EventEmitter();
  isLoading: EventEmitter<boolean> = new EventEmitter();
  cartCount: EventEmitter<any> = new EventEmitter();
  wishCount: EventEmitter<any> = new EventEmitter();
  emitPickedbook: EventEmitter<any> = new EventEmitter();

  event2Filters() {
    this.changed.emit(this.allCleared);
  }
  fetchAllBooks(page, limit) {
    return this.http.get('http://localhost:2000/books/page/' + page);
  }
  fetchNcertBooks(classNumber) {
    return this.http.get('http://localhost:2000/books/ncert/class/' + classNumber);
  }
  getData(queryParam) {
    return this.http.get('../assets/data/data.json?class=' + queryParam );
  }
  globalSearch(queryParam) {
    return this.http.post('http://localhost:2000/books/search', {query : queryParam});
  }
  gethotData() {
    return this.http.get('http://localhost:2000/books');
  }
  gethotData1() {
    return this.http.get('../assets/data/hot1.json');
  }
  gethotData2() {
    return this.http.get('../assets/data/hot2.json');
  }
  gethotData3() {
    return this.http.get('../assets/data/hot3.json');
  }
  userRegistration(data) {
    return this.http.post('http://localhost:2000/updateUser', data);
  }
  postNewOrder(data) {
    return this.http.post('http://localhost:2000/newOrder', data);
  }
  getMyOrder(data) {
    return this.http.post('http://localhost:2000/getOrders', data);
  }
  getOneOrder(data) {
    return this.http.get('http://localhost:2000/getOneOrder/' + data);
  }

  emitCartCOunt(){
      this.cartLength = this.sum(this.cartList, "quanitity", "");
      this.cartCount.emit(this.cartLength);
  }
  emitWishCOunt(){
    this.wishCount.emit(this.wishList.length);
    }
    emitpickedbook(){
      this.emitPickedbook.emit(this.pickedbook);
      }
  showCartAlert() {
    $(".cart-success").stop().removeClass("hidden");
      setTimeout(function(){
        $(".cart-success").stop().addClass("hidden");
      }, 1000)
  }

  sum(items: any, prop: any, prop2: any){
    return items.reduce( function(a: any, b: any){
        if (prop2) {
          return Number(a) + (Number(b[prop]) * Number(b[prop2]));
        } else{
          return Number(a) + Number(b[prop]);
        }

    }, 0);
  };
  isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
  searchFromArray(arr, regex) {
    let matches = [], i;
    for (i = 0; i < arr.length; i++) {
      if (arr[i].match(regex)) {
        matches.push(arr[i]);
      }
    }
    return matches;
    //console.log
  };
}
