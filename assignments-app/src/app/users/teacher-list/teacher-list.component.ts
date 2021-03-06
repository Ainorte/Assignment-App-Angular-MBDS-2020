import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {filter, map, pairwise, throttleTime} from "rxjs/operators";
import {User} from "../../shared/user.model";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {

  teachers: User[] = [];
  nextPage = 1;

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  constructor(private userService:UserService ,
              private ngZone: NgZone) { }

  ngOnInit(): void {
    this.getMoreTeachers();
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(100)
    ).subscribe(() => {
        this.ngZone.run(() => {
          this.getMoreTeachers();
        });
      }
    );
  }

  getMoreTeachers(): void {
    if (this.nextPage != null) {
      this.userService.getTeachers(this.nextPage, 20)
        .subscribe(teachers => {
          // exécuté que quand les données sont réellement disponible
          this.teachers = [...this.teachers, ...teachers.docs];
          this.nextPage = teachers.nextPage;
        });
    }
  }
}
