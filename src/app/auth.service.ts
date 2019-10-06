import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    loggedIn = false;
    user: any = {};
    emitUser: EventEmitter<any> = new EventEmitter();
    isloggesIn() {
        const promise = new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn)
                }, 500);
            }
        );
        return promise;
    }
    login(username: string, password: string) {

        return this.userLogin({username: username, password: password})

    }

    logout() {
        localStorage.removeItem('currentUser');
        this.loggedIn = false;
        this.emitUser.emit(null);
    }
    userLogin(data) {
      //console.log(data);
        return this.http.post('http://localhost:2000/login', data);
      }
      emitLoggedUser(user) {
        this.emitUser.emit(user);
        }
}
