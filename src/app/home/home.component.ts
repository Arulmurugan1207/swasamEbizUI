import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import 'bxslider';
import { CommonServices } from '../shared/common.services';
declare var $ :any;

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {  

  ngOnInit(){    
    $(document).ready(function(){
        $('.bxslider1').bxSlider({
          auto: 'true',
          speed: 750,
          autoDirection: 'next',
          infiniteLoop: true,
          hideControlOnEnd: true,
          onSliderLoad: function(currentSlide) {
              $(".kids-slider").eq(currentSlide).find(".caption").animate({
                  left: "0"
              }, 1000);
          },
          onSlideBefore: function($slideElement, currentIndex, oldIndex, newIndex) {
              $(".kids-slider").eq(currentIndex + 1).find(".caption").css("left", "-100%");
              $(".kids-slider").eq(currentIndex - 1).find(".caption").css("left", "-100%");
          },
          onSlideAfter: function($slideElement, currentIndex, oldIndex, newIndex) {
              $slideElement.find(".caption").animate({
                  left: "0"
              }, 50000);
          }
        });
        var slidewidth, maxSlides,maxSlidesmwb, width = $(window).width();
  
              if (width > 1024) {
                  slidewidth = 215;
                  maxSlides = 5;
                  maxSlidesmwb = 4;
              } else if (width >= 1024) {
                  slidewidth = 215;
                  maxSlides = 4;
                  maxSlidesmwb = 3;
              } else if (width >= 768) {
                  slidewidth = 230;
                  maxSlides = 3;
                  maxSlidesmwb = 2;
              } else if (width >= 480) {
                  slidewidth = 230;
                  maxSlides = 3;
                  maxSlidesmwb = 3;
              } else {
                  slidewidth = 250;
                  maxSlides = 1;
                  maxSlidesmwb = 1;
              }
              setTimeout(() => {
                
              
              $('#hotSlider').bxSlider({
                  hideControlOnEnd: true,
                  maxSlides: maxSlides,
                  moveSlides: 1,
                  slideWidth: slidewidth,
                  slideMargin: 0,
                  pager: false
              });

              $('#mwbSlider').bxSlider({        
                hideControlOnEnd: true,
              maxSlides: maxSlidesmwb,
              moveSlides: 1,
              slideWidth: slidewidth,
              slideMargin: 0,
                  pager: false
      });
      $('#nabSlider').bxSlider({        
          hideControlOnEnd: true,
          maxSlides:maxSlides,
          moveSlides: 1,
          slideWidth: slidewidth,
          slideMargin: 16,
          pager: false
      });
      $('#bbmSlider').bxSlider({
          hideControlOnEnd: true,
          maxSlides: maxSlides,
          moveSlides: 1,          
          slideWidth: slidewidth,         
          slideMargin: 0,
          pager: false
      });
    },500);
              
      });
    }
    
 
}