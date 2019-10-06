import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
declare var $ :any;
@Component({
  templateUrl: './offers.component.html'
})

export class OffersComponent implements OnInit {
  constructor(private route:ActivatedRoute) {
    
  }
param;
anchor;
  ngOnInit() { 
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.param = params['query'];
      var $anchor = $("." + this.param + "_container").offset().top - 80; 
      $('html,body').animate({ scrollTop: $anchor }); 
    })    
    
}

}
