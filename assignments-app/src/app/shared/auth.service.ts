import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logIn() {
  }

  logOut() {
  }

  isConnected(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
}
