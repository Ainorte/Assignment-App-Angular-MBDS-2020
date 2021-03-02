import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";

//Contrôle de l'égalité des mots de passe
// https://jasonwatmore.com/fr/post/2019/06/14/angular-8-exemple-de-validation-de-formulaires-reactifs-reactive-forms
function passwordsMustMatch(form: FormGroup): ValidatorFn {
  const password = form.controls['password'];
  const confirmPassword = form.controls['confirmPassword'];

  if(confirmPassword.value == ''){
    return;
  }

  confirmPassword.setErrors(null);

  if (password.invalid || confirmPassword.invalid) {
    return;
  }

  if (password.value !== confirmPassword.value.toString()) {
    confirmPassword.setErrors({mustMatch: true});
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  //form
  form: FormGroup = new FormGroup({
    password: new FormControl('', [
      Validators.required
    ]),
    confirmPassword: new FormControl('', [
      Validators.required
    ])
  },{
    validators: passwordsMustMatch
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  changePassword(){
    if(this.form.valid){
      this.authService.changePassword(this.form.controls["password"].value).subscribe( res => {
        console.log(res);
      });
    }
  }
}
