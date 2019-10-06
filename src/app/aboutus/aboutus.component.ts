import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';

@Component({
  templateUrl: './aboutus.component.html'
})

export class AboutusComponent {
imageObject = [{
        image: 'assets/images/clients/Velammalvidhya_logo.png',
        thumbImage: 'assets/images/clients/Velammalvidhya_logo.png'
        
    }, {
        image: 'https://ng-image-slider.herokuapp.com/assets/img/slider/6_min.jpeg',
        thumbImage: 'https://ng-image-slider.herokuapp.com/assets/img/slider/6_min.jpeg'       
    }
    , {
      image: 'assets/images/clients/bvs-logo.png'       
  }
  , {
    image: 'assets/images/clients/aristo.png'       
}
, {
  image: 'assets/images/clients/vgs_logo_resize.jpg'       
}
];
}
