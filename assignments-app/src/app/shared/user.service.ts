import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./user";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(private http:HttpClient) {

  }
  getUser():Observable<User>{
    return this.http.get<User>(`${environment.apiUri}/user`).pipe(tap(user =>
    {
      this.user = user;
    }));
  }
}
