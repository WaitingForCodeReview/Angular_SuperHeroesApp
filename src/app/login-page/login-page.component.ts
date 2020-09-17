import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService, FormData} from "../auth.service";
import {Router} from "@angular/router";
import {AppModule} from "../app.module";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  isValidUserEntered: boolean = true
  needToReLogin: boolean

  constructor(
    private auth: AuthService,
    private route: Router,
  ) {
    this.needToReLogin = this.auth.needToReLogin
  }

  ngOnInit(): void {
    this.formInit();
  }

  submit(): void {
    if(this.form.valid) {
      const formData: FormData = {...this.form.value};
      if (this.userExists(formData.email, formData.password)) {
        this.auth.login(formData);
        this.route.navigate(['/main'])
      } else {
        this.isValidUserEntered = false;
      }
    }
  }

  formInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  invalidAndTouched(formControlName: string): boolean {
    return (this.form.get(formControlName).invalid) && (this.form.get(formControlName).touched);
  }

  isEmpty(formControlName: string): boolean {
    return this.form.get(formControlName).errors.required;
  }

  userExists(email: string, password: string): boolean {
    return AppModule.users.some( item => LoginPageComponent.findUserCoincidence(item, email, password));
  }

  static findUserCoincidence(item: FormData, email: string, password: string): boolean {
    return (item.email === email) && (item.password === password);
  }

}
