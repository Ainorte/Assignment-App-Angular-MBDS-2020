import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "./user.model";
import {environment} from "../../environments/environment";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  uri = `${environment.apiUri}/users`;

  constructor(private http:HttpClient) {

  }
  getMe():Observable<User>{
    return this.http.get<User>(`${environment.apiUri}/user`).pipe(tap(user =>
    {
      this.user = user;
    }));
  }

  getTeachers(page = 1, limit = 20):Observable<any>{
    return this.http
      .get(`${this.uri}?page=${page}&limit=${limit}&students=false`)
      .pipe(catchError(this.handleError('getTeachers')));
  }

  /*getStudents(page = 1, limit = 20):Observable<any>{

  }*/

  getUser(id:String):Observable<User>{
    return this.http.get<User>(`${environment.apiUri}/users/${id}`).pipe(tap(user =>
    {
      this.user = user;
    }));
  }

  register(user:User):Observable<any>{
    return this.http
      .post(`${environment.apiUri}/register`, user)
      .pipe(catchError(this.handleError('register')));
  }

  private handleError(operation: string, result?: any): (error: any) => Observable<any> {
    return (error: any): Observable<any> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
      return of(result);
    };
  }
}
