import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './customers.component.html'
})
export class CustomersComponent {
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  onContactFormSubmit(form: NgForm) {
    console.log(form.value);
  }

}
