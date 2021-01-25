import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Assignment} from './assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  uri = `${environment.apiUri}/assignments`;

  constructor(
    private http: HttpClient
  ) {}

  getAssignments(page = 1, limit = 20, rendu?: boolean): Observable<any> {
    return this.http
      .get(`${this.uri}?page=${page}&limit=${limit}${ rendu != null ? '&rendu=' + rendu : ''}`)
      .pipe(catchError(this.handleError<any>('getAssignments')));
  }

  getAssignment(id: string): Observable<Assignment>{
    return this.http
      .get<Assignment>(`${this.uri}/${id}`)
      .pipe(catchError(this.handleError<Assignment>(`getAssignment(id=${id})`)));
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http
      .post(this.uri, assignment)
      .pipe(catchError(this.handleError<any>(`addAssignment(name${assignment.nom}`)));
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    return this.http
      .put<Assignment>(this.uri, assignment)
      .pipe(catchError(this.handleError<any>(`updateAssignment(id=${assignment._id}`)));
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http
      .delete(`${this.uri}/${assignment._id}`)
      .pipe(catchError(this.handleError<any>(`deleteAssignment(id=${assignment._id}`)));
  }

  private handleError<T>(operation: string, result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
      return of(result as T);
    };
  }
}
