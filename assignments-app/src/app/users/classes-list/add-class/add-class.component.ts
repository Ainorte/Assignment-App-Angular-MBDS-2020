import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ClassService} from "../class.service";
import {Class} from "../class.model";

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

  constructor(private classService:ClassService,
              private router:Router,) { }

  ngOnInit(): void {

  }

  submit(){

    if(this.form.valid){
      const classe = new Class();
      classe.nom = this.form.controls.nom.value;
      this.classService.addClass(classe).subscribe(auth => {
          this.router.navigate(['/users']);
      });
    }
  }

}
