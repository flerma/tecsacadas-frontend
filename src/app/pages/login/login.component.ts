import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LoginModel } from '../../core/model/LoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private router: Router,
              private loginService: LoginService,
              private fb: FormBuilder) {
    this.createForm();
  }

  hasError = false;
  errorMessage = '';
  showSpinner: any;
  invalidCredentials: boolean = false;

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.showSpinner = true;

    let loginModel = new LoginModel();
    loginModel.login = this.loginForm.controls['username'].value;
    loginModel.password = this.loginForm.controls['password'].value;

    this.loginService.authenticate(loginModel).subscribe({
      next: (response) => {
        if (response != null) {
          this.router.navigate(["home"]);
          this.showSpinner = false;
        } else {
          this.invalidCredentials = true;
          this.loginForm.controls['username'].setValue('');
          this.loginForm.controls['password'].setValue('');
          this.cleanInputs();
          this.showSpinner = false;
        }
      },
      error: (error) => {
        this.showSpinner = false;
        console.error(error);
        this.errorMessage = error;
        this.hasError = true;
      }
    });
  }

  cleanMessageErrors() {
    this.invalidCredentials = false;
    this.cleanInputs();
  }

  private cleanInputs() {
    this.loginForm.controls['username'].setErrors(null);
    this.loginForm.controls['password'].setErrors(null);
    this.loginForm.controls['username'].markAsUntouched();
    this.loginForm.controls['password'].markAsUntouched();
  }
}
