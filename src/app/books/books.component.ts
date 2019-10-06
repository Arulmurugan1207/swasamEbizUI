
import { Component, OnInit , HostListener, AfterViewInit, AfterContentChecked, AfterViewChecked} from '@angular/core';
import { CommonServices } from '../shared/common.services';
// tslint:disable-next-line: import-blacklist
import 'rxjs/Rx';
import { PagerService } from '../shared/pager.service';
declare var $: any;

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as _ from 'underscore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './books.component.html'
})
export class BooksComponent implements OnInit {
  allbooks: any = [];
  clonedBooks: any = [];

  filters: any = {};
  pickedbook: any = {};
  showFilterDetails = false;
  isNCERT: any = true;
  queryParam: any;
  searchQueryParam: any;
  routerParam: any;
  classNumber: any;
  // pager object
  pager: any = {};
  totalBooks;
  pageLimit = 25;
  pageNumber: any;
  // paged items
  pagedItems: any = [];

  constructor(private commonserivec: CommonServices,
              private pagerService: PagerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  click() {
    this.commonserivec.event2Filters();
  }

  setPage(page: number) {
    this.getBooks(page, this.pageLimit);
  }
  addToCartlist(){
      var index = this.commonserivec.cartList.findIndex(x => x.id == this.pickedbook.id);
      if (index == -1) {
        this.commonserivec.cartList.push(this.pickedbook);
      } else{
        // tslint:disable-next-line: radix
        let num = (parseInt(this.commonserivec.cartList[index].quanitity) + 1).toString();
        this.commonserivec.cartList[index].quanitity = num;
      }
      this.commonserivec.emitCartCOunt();
      this.commonserivec.cartbooksids = this.commonserivec.cartList.map(a => a.id);
      this.commonserivec.showCartAlert();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (Object.keys(params).length > 0) {
          this.searchQueryParam =  params.searchQuery;
          if (this.searchQueryParam) {
          this.searchBooks(this.searchQueryParam);
          this.commonserivec.isLoading.emit(true);
          $('#search').val(this.searchQueryParam);
        }
      }
    });

    this.route.params.subscribe(params => {
      if (Object.keys(params).length > 0) {
        this.routerParam = params;
        this.classNumber = params.classId;
        this.pageNumber = params.page;
        if ( this.pageNumber ) {
          this.setPage(this.pageNumber);
          this.isNCERT = false;
          }
        if ( this.classNumber ) {
          this.getNcertBooks(this.classNumber);
          this.isNCERT = true;
        }


      }
    });
  }
  onPickedBookget(bookid) {
    // tslint:disable-next-line: only-arrow-functions
    this.pickedbook = this.allbooks.filter(function(item){
      return item.id === bookid.bookid;
  });
    this.pickedbook = this.pickedbook[0];
    if (bookid.type == 'cart'){
    this.addToCartlist();
   } else {
    this.commonserivec.pickedbook = this.pickedbook;
    this.commonserivec.emitpickedbook();
   }
  }
  getBooks(page, limit) {
    this.commonserivec.isLoading.emit(true);
    this.commonserivec.fetchAllBooks(page, limit)
    .subscribe((response: any) => {
        this.allbooks = response.books;
        this.totalBooks = response.total;
        if (page < 1 || page > this.pager.totalPages) {
          return;
      }
        this.pager = this.pagerService.getPager(this.totalBooks, Number(page));
        this.pagedItems = this.allbooks;
        window.scrollTo(0, 0);
        this.commonserivec.isLoading.emit(false);
      }
    );
  }
  getNcertBooks(classNum) {
    this.commonserivec.isLoading.emit(true);
    this.commonserivec.fetchNcertBooks(classNum)
    .subscribe(
      (response) => {
        this.allbooks = response;
        this.pagedItems = this.allbooks;
        this.commonserivec.isLoading.emit(false);
      }
    );
  }
  searchBooks(searchParam) {
    this.commonserivec.isLoading.emit(true);
    this.commonserivec.globalSearch(searchParam)
    .subscribe(
      (response) => {
        this.allbooks = response;
        this.pagedItems = this.allbooks;
        this.commonserivec.isLoading.emit(false);
      }
    );
  }
  onFiltered(emittedFilters) {
    this.filters = emittedFilters;
    if (Object.keys(this.filters).length !== 0) {
      this.clonedBooks = this.multiFilter(this.allbooks, this.filters);
      this.showFilterDetails  = true;
    } else {
      this.clonedBooks = this.allbooks.map(a => Object.assign({}, a));
      this.showFilterDetails  = false;
    }

  }
  multiFilter(array, filters) {
    let filterKeys = Object.keys(filters);
    return array.filter((item) => filterKeys.every((key) => (filters[key].indexOf(item[key]) !== -1)));

  }

}
