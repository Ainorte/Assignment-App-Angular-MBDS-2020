import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ClassService} from "../class.service";
import {Class} from "../class.model";
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  //form
  form: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required])
  });

  messageSnackBar:MatSnackBarRef<TextOnlySnackBar>;

  constructor(private classService:ClassService,
              private router:Router,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {

  }

  submit(){

    if(this.form.valid){

      if(this.messageSnackBar != undefined){
        this.messageSnackBar.dismiss();
      }

      const classe = new Class();
      classe.nom = this.form.controls.nom.value;
      this.classService.addClass(classe).subscribe(data => {
          if(data != undefined){
            this.router.navigate(['/users']);
          }
        this.messageSnackBar = this.snackBar.open("La classe n'a pas pu être créée");
      });
    }
  }

}
