import { Component, OnInit } from '@angular/core';
import { CommonServices } from '../../shared/common.services';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orders: any = [];
    constructor(private commonService: CommonServices
  ) { }

  ngOnInit() {
    const User = JSON.parse(localStorage.getItem('currentUser'));
    this.commonService.isLoading.emit(true);
    this.commonService.getMyOrder({userid : User._id})
    .subscribe((response) => {
      this.orders = response;
      this.commonService.isLoading.emit(false);
    });
  }

}
