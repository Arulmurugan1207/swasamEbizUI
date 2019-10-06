import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validator, NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../auth.service';
import { CommonServices } from '../shared/common.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'

})
export class RegisterComponent implements OnInit {
  returnUrl;
  model: any = {};
  loading: any = false;
  resCode: any;
  //@ViewChild('f') form: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private commonService: CommonServices
    ) { }

ngOnInit() {

}

register(form: NgForm) {
    //console.log(this.model);
    this.commonService.userRegistration(this.model)
    .subscribe(data  => {
        let response:any = data;
        this.resCode = response.status;
        form.resetForm();
      },
      error  => {
      //console.log('Error', error);
      this.resCode = error.status;
      console.log(this.resCode);
      }
    );

}

}
