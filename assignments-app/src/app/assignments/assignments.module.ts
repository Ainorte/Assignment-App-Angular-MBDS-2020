import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssignmentsComponent} from './assignments.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {AssignmentsListComponent} from './assignments-list/assignments-list.component';
import {AddAssignmentComponent} from './add-assignment/add-assignment.component';
import {AssignmentDetailComponent} from './assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './edit-assignment/edit-assignment.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';




@NgModule({
  declarations: [
    AssignmentsComponent,
    AssignmentsListComponent,
    AddAssignmentComponent,
    AssignmentDetailComponent,
    EditAssignmentComponent
  ],
  exports: [
    AssignmentsComponent
  ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatIconModule,
        FormsModule,
        MatDatepickerModule, MatNativeDateModule,
        MatInputModule, MatButtonModule,
        RouterModule,
        ScrollingModule,
        MatListModule,
        MatDividerModule,
        MatCheckboxModule,
        MatCardModule,
        MatGridListModule,
        MatStepperModule, ReactiveFormsModule
    ]
})
export class AssignmentsModule {
}
