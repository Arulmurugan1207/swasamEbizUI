import { Component, OnChanges, OnInit, EventEmitter, Output, Input, AfterContentChecked } from '@angular/core';
import { CommonServices } from '../shared/common.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit {


  @Output() filtered = new EventEmitter<{}>();

  @Input() event: Event;

  ageFilter: any = [];
  discountFilter: any = [];
  categoryFilter: any = [];
  priceFilter: any = [];
  filters: any = {};
  routerParam;
  isNCERT;
  classNumber;
  pageNumber;
  constructor( private commonserivec: CommonServices,
               private route: ActivatedRoute) { }

  ngOnInit() {
    this.commonserivec.changed.subscribe(isOpen => {
      this.allClear();
    });

    this.route.params.subscribe(params => {
      if (Object.keys(params).length > 0) {
        this.routerParam = params;
        this.classNumber = params.classId;
        this.pageNumber = params.page;
        if ( this.pageNumber ) {
          this.isNCERT = false;
          }
        if ( this.classNumber ) {
          this.isNCERT = true;
        }
      }
    });
  }

  onFiltered() {
    this.filtered.emit(this.filters);
    this.commonserivec.isLoading.emit(true);
  }
  addAgefilter(event) {
    let val: any = event.target || event;
    if (val.checked) {
      this.ageFilter.push(val.value);
    } else {
      this.ageFilter.splice( this.ageFilter.indexOf(val.value), 1 );
    }

    if (this.ageFilter.length !== 0) {
      this.filters.age = this.ageFilter
    } else {
      delete this.filters.age;
    }
    this.onFiltered();
  }
  addClassfilter(event){

  }
  ageClear() {
    let checkboxes: any = document.querySelectorAll('.age input[type=checkbox]:checked');
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
        this.addAgefilter(checkbox);
    }
  }
  classClear() {
    let checkboxes: any = document.querySelectorAll('.class input[type=checkbox]:checked');
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
        this.addAgefilter(checkbox);
    }
  }
  addDiscountfilter(event) {
    let val: any = event.target || event;
    if (val.checked) {
      this.discountFilter.push(val.value);
    } else {
      this.discountFilter.splice( this.discountFilter.indexOf(val.value), 1 );
    }

    if (this.discountFilter.length !== 0) {
      this.filters.offerpercentage = this.discountFilter
    } else {
      delete this.filters.offerpercentage;
    }
    this.onFiltered();
  }

  discountClear() {
    let checkboxes: any = document.querySelectorAll('.discount input[type=checkbox]:checked');
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
        this.addDiscountfilter(checkbox);
    }
  }

  addCategoryfilter(event) {
    let val: any = event.target || event;
    if (val.checked) {
      this.categoryFilter.push(val.value);
    } else {
      this.categoryFilter.splice( this.categoryFilter.indexOf(val.value), 1 );
    }

    if (this.categoryFilter.length !== 0) {
      this.filters.booktype = this.categoryFilter
    } else {
      delete this.filters.booktype;
    }
    this.onFiltered();
  }

  categoryClear() {
    let checkboxes: any = document.querySelectorAll('.booktype input[type=checkbox]:checked');
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
        this.addCategoryfilter(checkbox);
    }
  }

  addPricefilter(event) {
    let val: any = event.target || event;
    if (val.checked) {
      this.priceFilter.push(val.value);
    } else {
      this.priceFilter.splice( this.priceFilter.indexOf(val.value), 1 );
    }

    if (this.priceFilter.length !== 0) {
      this.filters.pricecategory = this.priceFilter
    } else {
      delete this.filters.pricecategory;
    }
    this.onFiltered();
  }

  priceClear() {
    let checkboxes: any = document.querySelectorAll('.price input[type=checkbox]:checked');
    for (let checkbox of checkboxes) {
        checkbox.checked = false;
        this.addPricefilter(checkbox);
    }
  }
  allClear() {
        this.ageClear();
        this.priceClear();
        this.categoryClear();
        this.discountClear();
      }
}
