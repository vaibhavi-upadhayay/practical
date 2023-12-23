import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckValidationComponent } from './check-validation/check-validation.component';

@NgModule({
  declarations: [AppComponent, AddUserComponent, ViewUserComponent, CheckValidationComponent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
