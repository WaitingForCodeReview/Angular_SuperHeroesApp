import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserCreatePageComponent } from './user-create-page/user-create-page.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormData} from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserCreatePageComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
   static users: Array<FormData> = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
}
