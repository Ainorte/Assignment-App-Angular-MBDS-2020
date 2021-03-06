import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user.service";
import {Role} from "../shared/user.model";

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  constructor(private userService:UserService) {
  }

  ngOnInit(): void {
  }

  get isTeacher(){
    return this.userService.user.role === Role.TEACHER || this.userService.user.role === Role.ADMIN
  }

}
