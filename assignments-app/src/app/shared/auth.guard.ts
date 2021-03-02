import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from './auth.service';
import {map} from "rxjs/operators";
import {UserService} from "./user.service";

class userService {
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.isLogged) {
      //On vérifie que l'utilisateur n'est pas en première connexion.
      return this.userService.getUser().pipe(map(user => {
        if (user.premiere_connexion) {
          //Si première connexion, on affiche le formulaire de nouveau mot de passe
          this.router.navigate(["changePassword"]);
          return false;
        }

        return true;
      }));
    }

    //Utilisateur non connecté
    this.router.navigate(["login"]);
    return of(false);
  }
}
