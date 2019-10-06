import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        let url: string = state.url;
        return this.authService.isloggesIn()
                    .then(
                        (authenticated:boolean) => {
                            if(authenticated) {
                                return true;
                            } else {
                                
                                this.router.navigate(['/login'],{queryParams: {returnUrl: url}});
                            }
                        }
                    )
    }
    constructor(private authService:AuthenticationService,
        private router: Router){}
        
        
} 