import {Injectable} from '@angular/core';
import {configs} from "../config/config";
import {Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  registrationUser(userObject): Observable<any> {
    return this.http.post(`${configs.HOST}/user`, userObject)
  }

  login(user): Observable<Response> {
    return this.http.post<Response>(`${configs.HOST}/auth`, user);
  }
}

