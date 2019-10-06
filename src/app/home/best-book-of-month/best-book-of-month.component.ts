import { Component, OnInit, Input,Output, EventEmitter  } from '@angular/core';
import { CommonServices } from '../../shared/common.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-best-book-of-month',
  templateUrl: './best-book-of-month.component.html'
})
export class BestBookOfMonthComponent implements OnInit {
  @Input() book: any={};
  pickedbook: any;
  showTitle:boolean= false;
 currentlyPicked:any;
 type:any;
  bestofmonth:any=[];
  constructor(private commonservice:CommonServices,
    private route: ActivatedRoute ) {}

  ngOnInit() {
    this.getBooks();

  }
  getBooks() {    
    this.commonservice.gethotData1()
    .subscribe(
      (response) => {
        this.bestofmonth=response;
        let param1 = this.route.snapshot.queryParams["BBM"];
        if(param1 !=="all") {
          this.bestofmonth=this.bestofmonth.slice(0,6);
          this.showTitle = false;  
        }  else {
          this.showTitle = true;
        }    
      }
    );     
  }
  viewBook(bookid) {
    this.pickedbook=this.bestofmonth.filter(function(item){
      return item.id==bookid;         
    }); 
    this.pickedbook=this.pickedbook[0];
    this.commonservice.pickedbook=this.pickedbook;
    this.commonservice.emitpickedbook();  
  }
  pickBook(bookid) {    
    this.pickedbook=this.bestofmonth.filter(function(item){
      return item.id==bookid;         
  }); 
  this.pickedbook=this.pickedbook[0];  
  this.addToCartlist();
  
  }
  addToCartlist(){    
    var index = this.commonservice.cartList.findIndex(x => x.id==this.pickedbook.id);
    if(index==-1) {
      this.commonservice.cartList.push(this.pickedbook);        
    } else{
      let num = (parseInt(this.commonservice.cartList[index].quanitity)+1).toString();
      this.commonservice.cartList[index].quanitity = num;
    }      
      this.commonservice.emitCartCOunt();
      this.commonservice.cartbooksids=this.commonservice.cartList.map(a => a.id);
      this.commonservice.showCartAlert();
}
  

}
