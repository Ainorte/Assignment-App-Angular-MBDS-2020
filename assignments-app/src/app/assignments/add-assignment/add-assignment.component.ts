import { Component, OnInit } from '@angular/core';
import {AssignmentsService} from '../assignments.service';
import {Router} from '@angular/router';
import {Assignment} from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {UserService} from "../../shared/user.service";
import {ClassService} from "../../users/classes-list/class.service";
import {Class} from "../../users/classes-list/class.model";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddAssignmentComponent implements OnInit {

  nameFormGroup: FormGroup;
  dateFormGroup: FormGroup;

  classes:Class[] = [];

  constructor(private assignmentsService: AssignmentsService,
              private router: Router,
              private _formBuilder: FormBuilder,
              private userService: UserService,
              private classService:ClassService) {
  }

  ngOnInit() {
    this.classService.getClasses(1,0).subscribe(data =>{
      this.classes = data.docs;
    });

    this.nameFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required],
      matiereCtrl: ['', Validators.required]
    });
    this.dateFormGroup = this._formBuilder.group({
      dateCtrl: ['', Validators.required],
      classCtrl: [null, Validators.required]
    });
  }



  onSubmit(): void {
    if(this.nameFormGroup.valid && this.dateFormGroup.valid){
      const newAssignment = new Assignment();

      newAssignment.nom = this.nameFormGroup.controls.nameCtrl.value;
      newAssignment.dateDeRendu = this.dateFormGroup.controls.dateCtrl.value;
      newAssignment.matiere = this.nameFormGroup.controls.matiereCtrl.value;
      newAssignment.prof = this.userService.user;

      const eleves = this.dateFormGroup.controls.classCtrl.value.eleves;

      for(let i = 0; i < eleves.length; i++ ){
        newAssignment.eleve = eleves[i];
        this.assignmentsService.addAssignment(newAssignment)
          .subscribe(message => {

          });
      }
      // On veut re-afficher la page d'accueil avec la liste
      this.router.navigate(['/home']);
    }
  }
}
