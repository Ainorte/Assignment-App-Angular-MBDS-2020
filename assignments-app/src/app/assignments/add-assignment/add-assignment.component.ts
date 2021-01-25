import { Component, OnInit } from '@angular/core';
import {AssignmentsService} from '../assignments.service';
import {Router} from '@angular/router';
import {Assignment} from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.scss']
})
export class AddAssignmentComponent implements OnInit {

  nomDevoir: string;
  dateRendu: Date;

  constructor(private assignmentsService: AssignmentsService,
              private router: Router) {
  }

  ngOnInit(): void {
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
