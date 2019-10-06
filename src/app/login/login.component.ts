import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  returnUrl:any;
  isRegistered:any;
  model:any = {};
  loading:any=false;
  resCode: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

ngOnInit() {
    this.authenticationService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}

login() {
    const userData = this.model;
    console.log(userData);
    this.authenticationService.userLogin(userData)
    .subscribe(
      result  => {
        const response:any = result;
        if(response.message =='success'){
          this.resCode = response.status;
          this.authenticationService.loggedIn = true;
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.authenticationService.emitLoggedUser(response.user);
          this.router.navigate([this.returnUrl]);
        }

      },
      error  => {
      console.log("Error", error);
      this.resCode = error.status;
      }
    );

}

}
