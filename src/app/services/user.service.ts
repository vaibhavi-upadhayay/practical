import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  removeUser(id: number) {
    let users: any = localStorage.getItem('users');
    users = users ? JSON.parse(users) : [];

    let index = users.findIndex((user: any) => user.id == id);

    if (index !== -1) {
      users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  editUser(id: number, body: any) {
    let users: any = localStorage.getItem('users');
    users = users ? JSON.parse(users) : [];

    let index = users.findIndex((user: any) => user.id == id);

    if (index !== -1) {
      users[index] = {
        id: id,
        ...body,
      };
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  addUser(body: any) {
    let users: any = localStorage.getItem('users');
    users = users ? JSON.parse(users) : [];
    let id = users && users.length > 0 ? users[users.length - 1].id : 0;
    users.push({
      id: id + 1,
      ...body,
    });
    localStorage.setItem('users', JSON.stringify(users));
  }
}
