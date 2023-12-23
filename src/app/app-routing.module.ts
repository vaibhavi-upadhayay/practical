import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CheckValidationComponent } from './check-validation/check-validation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: ViewUserComponent,
  },
  {
    path: 'users/add',
    component: AddUserComponent,
  },
  {
    path: 'users/edit/:id',
    component: AddUserComponent,
  },
  {
    path: 'check-validation',
    component: CheckValidationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
