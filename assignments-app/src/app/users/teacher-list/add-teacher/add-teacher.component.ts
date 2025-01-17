import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Role, User} from "../../../shared/user.model";
import {UserService} from "../../../shared/user.service";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  Role = Role;
  valid = false;
  password = '';

  messageSnackBar:MatSnackBarRef<TextOnlySnackBar>;

  //form
  form: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(Role.TEACHER, [Validators.required]),
    image: new FormControl('')
  });

  constructor(private userService: UserService,
              private router: Router,
              private snackBar:MatSnackBar) {
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {

      if(this.messageSnackBar != undefined){
        this.messageSnackBar.dismiss();
      }

      const user = new User();
      user.nom = this.form.controls.nom.value;
      user.prenom = this.form.controls.prenom.value;
      user.email = this.form.controls.email.value;
      user.role = this.form.controls.role.value;
      user.image = this.form.controls.image.value;
      this.userService.register(user).subscribe(data => {
        if(data != undefined){
          this.password = data.password;
          this.valid = true;
          this.form.disable()
          this.messageSnackBar = this.snackBar.open("L'utilisateur a été créé");
        }
        else {
          this.messageSnackBar = this.snackBar.open("L'utilisateur n'a pas pu être créé");
        }
      });
    }
  }

  reset() {
    this.messageSnackBar.dismiss();
    this.valid = false;
    this.form.reset();
    this.form.enable();
    this.password = '';
    this.form.controls.role.setValue(Role.TEACHER);
  }

  ngOnDestroy(){
    this.messageSnackBar.dismiss();
    this.password = '';
  }
}
