import { Component, OnInit, DoCheck, AfterViewInit, AfterContentChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
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
