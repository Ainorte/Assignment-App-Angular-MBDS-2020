import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [LoginComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule, MatButtonModule,
    FormsModule,
    MatIconModule,
    MatCardModule, ReactiveFormsModule
  ]
})
export class LoginModule { }
