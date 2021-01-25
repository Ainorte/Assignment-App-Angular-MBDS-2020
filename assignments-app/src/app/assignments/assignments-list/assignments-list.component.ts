import {AfterViewInit, Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {Assignment} from '../assignment.model';
import {AssignmentsService} from '../assignments.service';
import {filter, map, pairwise, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit, AfterViewInit {

  @Input() rendu: boolean;

  assignments: Assignment[] = [];
  nextPage = 1;

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  constructor(private assignmentsService: AssignmentsService,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getMoreAssignments();
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(100)
    ).subscribe(() => {
        this.ngZone.run(() => {
          this.getMoreAssignments();
        });
      }
    );
  }

  getMoreAssignments(): void {
    if (this.nextPage != null) {
      this.assignmentsService.getAssignments(this.nextPage, 20, this.rendu)
        .subscribe(assignments => {
          // exécuté que quand les données sont réellement disponible
          this.assignments = [...this.assignments, ...assignments.docs];
          this.nextPage = assignments.nextPage;
        });
    }
  }
}
