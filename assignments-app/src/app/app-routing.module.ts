import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssignmentsComponent} from './assignments/assignments.component';
import {AddAssignmentComponent} from './assignments/add-assignment/add-assignment.component';
import {AssignmentDetailComponent} from './assignments/assignment-detail/assignment-detail.component';
import {EditAssignmentComponent} from "./assignments/edit-assignment/edit-assignment.component";
import {AuthGuard} from "./shared/auth.guard";
import {LoginComponent} from './login/login.component';
import {UsersComponent} from "./users/users.component";
import {AdminGuard} from "./shared/admin.guard";
import {ChangePasswordComponent} from "./login/change-password/change-password.component";
import {AddClassComponent} from "./users/classes-list/add-class/add-class.component";
import {AddTeacherComponent} from "./users/teacher-list/add-teacher/add-teacher.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: AssignmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    component: AddAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignment/:id',
    component: AssignmentDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'class/add',
    component: AddClassComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'teacher/add',
    component: AddTeacherComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
