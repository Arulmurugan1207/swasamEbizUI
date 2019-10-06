import { Component, OnInit } from '@angular/core';
import { CommonServices } from '../../shared/common.services';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {

  constructor( private commonService:CommonServices) { }

  whishlist:any = [];
  pickedbook:any={};

  onPickedBookget(bookid){
    this.pickedbook=this.whishlist.filter(function(item){
      return item.id==bookid;         
    });
   this.pickedbook = this.pickedbook[0];   
  }

  onItemDeleted(index: number){
    this.commonService.wishList.splice(index, 1);
    this.whishlist = this.commonService.wishList;
    this.commonService.emitWishCOunt();
    this.commonService.wishedbokids=this.commonService.wishList.map(a => a.id);

  }

  ngOnInit() {
    this.whishlist = this.commonService.wishList;
   this.commonService.wishCount.emit(this.whishlist.length);
  }

}
