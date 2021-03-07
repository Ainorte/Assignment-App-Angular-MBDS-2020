import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {Assignment} from "../../assignments/assignment.model";
import {Class} from "./class.model";

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  uri = `${environment.apiUri}/classes`;

  constructor(
    private http: HttpClient
  ) {}

  getClasses(page = 1, limit = 20): Observable<any> {
    return this.http
      .get(`${this.uri}?page=${page}&limit=${limit}`)
      .pipe(catchError(this.handleError<any>('getClasses')));
  }

  getClass(id: string): Observable<Class>{
    return this.http
      .get<Class>(`${this.uri}/${id}`)
      .pipe(catchError(this.handleError<Class>(`getClass(id=${id})`)));
  }

  addClass(classe: Class): Observable<any> {
    return this.http
      .post(this.uri, classe)
      .pipe(catchError(this.handleError<any>(`addClass(name${classe.nom}`)));
  }

  updateClass(classe: Class): Observable<any> {
    return this.http
      .put<Assignment>(this.uri, classe)
      .pipe(catchError(this.handleError<any>(`updateClass(id=${classe._id}`)));
  }

  deleteClass(classe: Class): Observable<any> {
    return this.http
      .delete(`${this.uri}/${classe._id}`)
      .pipe(catchError(this.handleError<any>(`deleteClass(id=${classe._id}`)));
  }

  private handleError<T>(operation: string, result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    };
  }
}
