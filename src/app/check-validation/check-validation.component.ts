import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-check-validation',
  templateUrl: './check-validation.component.html',
  styleUrls: ['./check-validation.component.css'],
})
export class CheckValidationComponent implements OnInit {
  fields = [
    {
      label: 'Name',
      formControlName: 'name',
    },
    {
      label: 'Email',
      formControlName: 'email',
    },
    {
      label: 'Mobile Number',
      formControlName: 'number',
    },
    {
      label: 'Gender',
      formControlName: 'gender',
    },
    {
      label: 'Role',
      formControlName: 'role',
    },
    {
      label: 'Address',
      formControlName: 'address',
    },
  ];

  validationForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.validationForm = this.initializeForm();
  }

  ngOnInit(): void {
    this.fillValidaionData();
  }

  initializeForm() {
    return this.formBuilder.group({
      name: [true],
      email: [true],
      number: [true],
      gender: [true],
      role: [true],
      address: [true],
    });
  }

  fillValidaionData() {
    let validationData: any = localStorage.getItem('check-validation');

    if (validationData) {
      validationData = JSON.parse(validationData);
      this.validationForm.patchValue(validationData);
    }
  }

  onSubmit() {
    localStorage.setItem(
      'check-validation',
      JSON.stringify(this.validationForm.value)
    );

    this.router.navigate(['users']);
  }

  goBack() {
    this.router.navigate(['users']);
  }
}
