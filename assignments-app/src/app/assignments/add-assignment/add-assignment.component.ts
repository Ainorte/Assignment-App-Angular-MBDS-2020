import { Component, OnInit } from '@angular/core';
import {AssignmentsService} from '../assignments.service';
import {Router} from '@angular/router';
import {Assignment} from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class AddAssignmentComponent implements OnInit {

  formGroup: FormGroup;
  nameFormGroup: FormGroup;
  dateFormGroup: FormGroup;

  nomDevoir: string;
  dateRendu: Date;

  constructor(private assignmentsService: AssignmentsService,
              private router: Router,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.nameFormGroup = this._formBuilder.group({
      nameCtrl: ['', Validators.required]
    });
    this.dateFormGroup = this._formBuilder.group({
      dateCtrl: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const newAssignment = new Assignment();

    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu;
    newAssignment.rendu = false;

    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => {
        console.log(message);
        // On veut re-afficher la page d'accueil avec la liste
        this.router.navigate(['/home']);
      });
  }
}
