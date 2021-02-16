import { Component } from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gestion des devoirs';

  constructor(private authService:AuthService,
              private router:Router) {
  }

  get isLogged(){
    return this.authService.isLogged;
  }

  logout(){
    this.authService.logOut().subscribe(auth =>{
      //On redirige vers la page de login
      this.router.navigate(['/login']);
    });
  }

}
