import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import { ClassesListComponent } from './classes-list/classes-list.component';
import { AddClassComponent } from './classes-list/add-class/add-class.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { AddTeacherComponent } from './teacher-list/add-teacher/add-teacher.component';
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [UsersComponent, TeacherListComponent, ClassesListComponent, AddClassComponent, AddTeacherComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    ScrollingModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule
  ]
})
export class UsersModule { }
