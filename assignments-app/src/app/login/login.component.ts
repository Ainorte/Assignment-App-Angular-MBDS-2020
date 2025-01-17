import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorSnackBar:MatSnackBarRef<TextOnlySnackBar>;

  //form
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService:AuthService,
              private router:Router,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {

  }

  getErrorEmail():string{
    if(this.form.controls.email.hasError('required')){
      return "Email obligatoire";
    }
    if(this.form.controls.email.hasError('email')){
      return "Email invalide";
    }

    return '';
  }

  login(){
    if(this.errorSnackBar != undefined)
      this.errorSnackBar.dismiss();

    if(this.form.valid){
      this.authService.logIn(this.form.controls.email.value, this.form.controls.password.value).subscribe(auth => {
        if(auth.auth){
          this.router.navigate(['/']);
        }
        else{
          this.errorSnackBar = this.snackBar.open(auth.message);
        }
      });
    }
  }

}
