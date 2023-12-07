import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router,
              private fb: FormBuilder) {
      this.createForm();
  }

  reportForm!: FormGroup;

  createForm() {
    this.reportForm = this.fb.group({
      month: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  gerar() {
    console.log(this.reportForm.controls['month'].value);
    console.log(this.reportForm.controls['year'].value);
  }
}
