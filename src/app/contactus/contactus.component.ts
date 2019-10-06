import { Component, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
declare var $ :any;

@Component({
  templateUrl: './contactus.component.html'
})
export class ContactusComponent {

  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  onContactFormSubmit(form: NgForm) {
    console.log(form.value);
  }

  toggleAccordion(id) {
    $("[data-block='contact-info'] .nav-justified li a").removeClass("active");
    $(event.target).addClass("active");    
    $("#contact-info dl").stop(true).slideUp("slow");
    $(id).stop(true).slideDown("slow");
  }

}
