import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  userData: any;
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    let users = localStorage.getItem('users');
    if (users) {
      this.userData = JSON.parse(users);
    }
  }

  editUser(id: number) {
    this.router.navigate(['users', 'edit', id.toString()]);
  }
  removeUser(id: number) {
    this.userService.removeUser(id);
    this.getUserData();
  }

  goToAddUser() {
    this.router.navigate(['users', 'add']);
  }

  goToValidation() {
    this.router.navigate(['check-validation']);
  }
}
