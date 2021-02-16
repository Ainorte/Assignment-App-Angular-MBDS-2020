import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AssignmentsComponent} from './assignments/assignments.component';
import {AddAssignmentComponent} from './assignments/add-assignment/add-assignment.component';
import {AssignmentDetailComponent} from './assignments/assignment-detail/assignment-detail.component';
import {EditAssignmentComponent} from "./assignments/edit-assignment/edit-assignment.component";
import {AuthGuard} from "./shared/auth.guard";
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'assignment/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
