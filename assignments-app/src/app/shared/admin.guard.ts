import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "./user.service";
import {map} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Role} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //On vérifie que l'utilisateur n'est pas en première connexion.
    return this.userService.getMe().pipe(map(user => {
      if (state.url != '/changepassword' && user.premiere_connexion) {
        //Si première connexion, on affiche le formulaire de nouveau mot de passe
        this.router.navigate(["changepassword"]);
        return false;
      }
      else if(user.role != Role.ADMIN){
        return false;
      }

      return true;
    }))
  }

}
