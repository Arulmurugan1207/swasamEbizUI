import { Component, OnInit, Input } from '@angular/core';
import { CommonServices } from '../../shared/common.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-most-wished-books',
  templateUrl: './most-wished-books.component.html'
})
export class MostWishedBooksComponent implements OnInit {

  mostwishedbooks:any =[];
  pickedbook:any;
  showTitle:boolean= false;
  constructor(private commonservice:CommonServices,
    private route: ActivatedRoute ) {}

  ngOnInit() {
    this.getBooks();

  }
  getBooks() {    
    this.commonservice.gethotData2()
    .subscribe(
      (response) => {
        this.mostwishedbooks=response;
        let param1 = this.route.snapshot.queryParams["MWB"];
        if(param1 !=="all") {
        this.mostwishedbooks=this.mostwishedbooks.slice(0,6); 
        this.showTitle = false;  
      }  else {
        this.showTitle = true;
      }         
      }
    );     
  }
  viewBook(bookid) {
    this.pickedbook=this.mostwishedbooks.filter(function(item){
      return item.id==bookid;         
    }); 
    this.pickedbook=this.pickedbook[0];
    this.commonservice.pickedbook=this.pickedbook;
    this.commonservice.emitpickedbook();  
  }
  pickBook(bookid) {    
    this.pickedbook=this.mostwishedbooks.filter(function(item){
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
