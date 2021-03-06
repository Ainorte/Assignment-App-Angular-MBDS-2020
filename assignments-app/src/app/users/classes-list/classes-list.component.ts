import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {ClassService} from "./class.service";
import {User} from "../../shared/user.model";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserService} from "../../shared/user.service";
import {filter, map, pairwise, throttleTime} from "rxjs/operators";
import {Class} from "./class.model";

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {

  classes: Class[] = [];
  nextPage = 1;

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  constructor(private classService:ClassService ,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getMoreClasses();
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(100)
    ).subscribe(() => {
        this.ngZone.run(() => {
          this.getMoreClasses();
        });
      }
    );
  }

  getMoreClasses(): void {
    if (this.nextPage != null) {
      this.classService.getClasses(this.nextPage, 20)
        .subscribe(classes => {
          // exécuté que quand les données sont réellement disponible
          this.classes = [...this.classes, ...classes.docs];
          this.nextPage = classes.nextPage;
        });
    }
  }
}
