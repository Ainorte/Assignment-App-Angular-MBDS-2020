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
  getUser():Observable<User>{
    return this.http.get<User>(`${environment.apiUri}/user`).pipe(tap(user =>
    {
      this.user = user;
    }));
  }

  getTeachers(page = 1, limit = 20):Observable<any>{
    return this.http
      .get(`${this.uri}?page=${page}&limit=${limit}&students=false`)
      .pipe(catchError(this.handleError<any>('getTeachers')));
  }

  /*getStudents(page = 1, limit = 20):Observable<any>{

  }*/

  register(user:User):Observable<any>{
    return this.http
      .post(`${environment.apiUri}/register`, user)
      .pipe(catchError(this.handleError<any>('register')));
  }

  private handleError<T>(operation: string, result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    };
  }
}
