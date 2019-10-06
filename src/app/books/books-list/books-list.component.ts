import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonServices } from '../../shared/common.services';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html'
})
export class BooksListComponent implements OnInit {
  @Input() book: any = {};
  @Output() pickedbook: any = new EventEmitter<any>();

 currentlyPicked: any;
 type: any;

  constructor( private commonserivec: CommonServices) { }

  pickBook(bookid, type) {
    this.currentlyPicked = bookid;
    this.type = type;
    this.pickedbook.emit({bookid, type});
  }
  /*onWhishAdd(event){
    event.stopPropagation();
    if(!this.commonserivec.wishList.includes(this.currentlyPicked) && !this.commonserivec.cartList.includes(this.currentlyPicked)){
      event.target.classList.add("added");
    }

  }
  onCartAdd(event){
    event.stopPropagation();
    if(!this.commonserivec.wishList.includes(this.currentlyPicked) && !this.commonserivec.cartList.includes(this.currentlyPicked)){
    event.target.classList.add("added");
  }
  }*/
  ngOnInit() {

  }

}
