import {Component, Input, OnInit} from '@angular/core';
import {AssignmentsService} from '../assignments.service';
import {Assignment} from '../assignment.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.scss']
})
export class AssignmentDetailComponent implements OnInit {
  assignment: Assignment;

  constructor(private assignmentsService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment(): void {
    // l'id passé par l'URL est de type string et nous on veut
    // un number. On peut utiliser l'astuce suivante : rajouter un "+" devant
    // la chaine, ce qui va la transformer en number
    const id = this.route.snapshot.params.id;
    console.log('detail : id récupéré dans URL = ' + id);
    this.assignmentsService.getAssignment(id)
      .subscribe(a => {
        this.assignment = a;
      });
  }

  onDelete(): void {
    this.assignmentsService.deleteAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.assignment = null;
        this.router.navigate(['/home']);
      });
  }

  onAssignementRendu(): void {
    this.assignment.rendu = true;
    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log('assignment mis à jour');
        this.router.navigate(['/home']);
      });
  }

  onClickEdit(): void {
    this.router.navigate(
      ['assignment', this.assignment._id, 'edit']);
  }

  loggedIn(): boolean {
    // TODO : Refactor authentication
    return true;
  }

}
