import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Router} from "@angular/router";
import {UserService} from "./shared/user.service";
import {Role} from "./shared/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestion des devoirs';

  constructor(private authService:AuthService,
              private userService:UserService,
              private router:Router) {
  }

  get isLogged(){
    return this.authService.isLogged;
  }

  get isAdmin(){
    return this.userService.user == undefined ? false : this.userService.user.role == Role.ADMIN;
  }

  logout(){
    this.authService.logOut().subscribe(auth =>{
      //On redirige vers la page de login
      this.router.navigate(['/login']);
    });
  }

}
