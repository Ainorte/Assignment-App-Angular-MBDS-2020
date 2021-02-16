import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Auth, AuthResponse} from "./auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uri = `${environment.apiUri}/login`;
  private token :String = null;

  get isLogged(): boolean {
    return this.token != null;
  }


  constructor(private http: HttpClient) {}

  logIn(email:String, password:String): Observable<Auth> {
    const body = {
      email: email,
      password: password
    };

    return this.http.post<AuthResponse>(this.uri,body)
      .pipe(
        map(res => {
          if(res.auth){
            //If auth is ok, save the token for api requests
            this.token = res.token;
          }
          else {
            this.token = null;
          }

          const result = new Auth();
          result.auth = res.auth;
          result.message = res.message;
          return result;
        }),
        catchError(this.handleError("logIn"))
      );
  }

  logOut(): Observable<Auth>{
    //Remove token disable login
    this.token = null

    const result = new Auth();
    result.auth = false;
    result.message = "Déconnexion réussie";

    return of(result);
  }

  isConnected(): Observable<boolean>{
    return of(this.isLogged);
  }

  private handleError(operation: string, res?: HttpResponse<any>): (error: any) => Observable<Auth> {
    return (error: any): Observable<Auth> => {
      console.log(error);
      console.log(operation + ' issue : ' + error.message);

      const json = JSON.parse(res.body);
      const result = new Auth();
      result.auth = false;
      result.message = json.message;

      return of(result);
    };
  }
}
