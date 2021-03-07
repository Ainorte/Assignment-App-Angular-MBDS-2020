import { Component, OnInit } from '@angular/core';
import {Class} from "../class.model";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ClassService} from "../class.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Role, User} from "../../../shared/user.model";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../shared/user.service";

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private classService:ClassService,
              private userService:UserService,
              private snackBar:MatSnackBar) { }

  classe : Class;
  valid = false;
  password = '';

  messageSnackBar:MatSnackBarRef<TextOnlySnackBar>;

  //form
  form: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.classService.getClass(id).subscribe( classe =>{
      if(classe == undefined){
        this.router.navigate(['/users']);
      }
      this.classe = classe;
    });
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
      user.role = Role.STUDENT;

      this.userService.register(user).subscribe(data => {
        if(data != undefined){
          this.password = data.password;

          this.userService.getUser(data._id).subscribe(user =>{
            this.classe.eleves.push(user)
            this.classService.updateClass(this.classe).subscribe(d => {
              this.valid = true;
              this.form.disable();
              this.messageSnackBar = this.snackBar.open("L'utilisateur a été créé");
            })
          })
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
