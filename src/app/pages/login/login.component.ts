import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from '../users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private router: Router,
              private userService: UsersService,
              private fb: FormBuilder) {
    this.createForm();
  }

  showSpinner: any;

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.showSpinner = true;
    if (this.userService.authenticate(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)) {
      this.router.navigate(["home"]);
      this.showSpinner = false;
    } else {
      alert("Invalid credentials");
      this.showSpinner = false;
    }
  }
}
