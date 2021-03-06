import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Role, User} from "../../../shared/user.model";
import {UserService} from "../../../shared/user.service";

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  Role = Role;

  //form
  form: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl(Role.TEACHER, [Validators.required]),
    image: new FormControl('')
  });

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  submit() {
    if (this.form.valid) {
      const user = new User();
      user.nom = this.form.controls.nom.value;
      user.prenom = this.form.controls.prenom.value;
      user.email = this.form.controls.email.value;
      user.role = this.form.controls.role.value;
      user.image = this.form.controls.image.value;
      this.userService.register(user).subscribe(auth => {
        //this.router.navigate(['/users']);
      });
    }
  }
}
