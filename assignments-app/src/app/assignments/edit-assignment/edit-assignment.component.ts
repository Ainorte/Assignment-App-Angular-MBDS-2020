import { Component, OnInit } from '@angular/core';
import {Assignment} from '../assignment.model';
import {AssignmentsService} from '../assignments.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.scss']
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment;
  nomAssignment: string;
  dateDeRendu: Date;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAssignment();

    console.log('Query Params : ');
    console.log(this.route.snapshot.queryParams);
    console.log('fragment : ' + this.route.snapshot.fragment);
  }

  getAssignment(): void {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = this.route.snapshot.params.id;
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      this.nomAssignment = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
    });
  }

  onSaveAssignment(): void {
    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }

    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);

        // navigation vers la home page QUE QUAND LA REPONSE
        // DU SERVEUR EST ARRIVEE, c'est-à-dire que l'assignment a bien
        // été modifié dans la base dans le cloud
        this.router.navigate(['/home']);
      });
  }
}
