import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  stateData = [
    {
      id: 1,
      title: 'Gujrat',
    },
    {
      id: 2,
      title: 'Maharashtra',
    },
  ];

  genderData = ['male', 'female', 'other'];
  roleData = ['user', 'admin'];
  userForm: FormGroup;
  editUserId!: number;

  userExists = true;
  addressRequired = false;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = this.initializeForm();
    this.setValidation();

    this.activatedRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id) {
        this.editUserId = +id;
        this.fillUserForm();
      }
    });
  }

  ngOnInit(): void {}

  setValidation() {
    let checkValidaionData: any = localStorage.getItem('check-validation');
    if (checkValidaionData) {
      checkValidaionData = JSON.parse(checkValidaionData);

      Object.keys(checkValidaionData).forEach((fieldName: any) => {
        if (checkValidaionData[fieldName]) {
          if (fieldName !== 'address') {
            this.userForm.get(fieldName)?.setValidators([Validators.required]);
          } else {
            this.addressRequired = true;
            this.addAddress();
            let formGroup = (
              this.userForm.get('address') as FormArray<FormGroup>
            ).at(0);

            formGroup.get('street')?.setValidators([Validators.required]);
            formGroup.get('city')?.setValidators([Validators.required]);

            formGroup.get('state')?.setValidators([Validators.required]);

            formGroup.get('zip')?.setValidators([Validators.required]);
          }
        }
      });
    }
  }

  fillUserForm() {
    let users: any = localStorage.getItem('users');
    if (users) {
      users = JSON.parse(users);

      let editUserData = users.find((user: any) => user.id == this.editUserId);

      if (editUserData) {
        editUserData.address &&
          editUserData.address.forEach((address: any, i: number) => {
            if (this._address.at(i)) {
              this._address.at(i).patchValue(address);
            } else {
              this.addAddress();
              this._address.at(i).patchValue(address);
            }
          });

        delete editUserData.address;
        this.userForm.patchValue(editUserData);
      } else {
        this.userExists = false;
      }
    } else {
      this.userExists = false;
    }
  }

  get _address() {
    return this.userForm.get('address') as FormArray<FormGroup>;
  }
  initializeForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      number: [''],
      gender: ['male'],
      role: ['user'],
      address: this.formBuilder.array([]),
    });
  }

  addAddress() {
    this._address.push(
      this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zip: [''],
      })
    );
  }

  removeAddress(index: number) {
    this._address.removeAt(index);
  }

  onSubmit() {
    if (this.userForm.valid) {
      let users: any = localStorage.getItem('users');
      users = users ? JSON.parse(users) : [];

      if (this.editUserId) {
        this.userService.editUser(this.editUserId, this.userForm.value);
        this.router.navigate(['users']);
      } else {
        this.userService.addUser(this.userForm.value);
        this.router.navigate(['users']);
      }
    }
  }

  goBack() {
    this.router.navigate(['users']);
  }
}
