import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup
  isValidUserEntered: boolean
  needToReLogin: boolean

  constructor(
    private auth: AuthService,
    private route: Router,
  ) {
    this.isValidUserEntered = true;
    this.needToReLogin = this.auth.needToReLogin
  }

  ngOnInit() {
    this.formInit();
  }

  submit() {
    if(this.form.valid) {
      const formData = {...this.form.value};

      if (this.userExists(formData.email, formData.password)) {
        this.auth.login(formData);
        this.route.navigate(['/main'])
      } else {
        this.isValidUserEntered = false;
      }
    }
  }

   formInit() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  invalidAndTouched(formControlName: string) {
    return (this.form.get(formControlName).invalid) && (this.form.get(formControlName).touched);
  }

  isEmpty(formControlName: string) {
    return this.form.get(formControlName).errors.required;
  }

  userExists(email: string, password: string) {
    for (let key in localStorage) {
      if (LoginPageComponent.findUserCoincidence(key, email, password)) {
        return true;
      }
    }
    return false;
  }

  static findUserCoincidence(key, email, password) {
    return (localStorage.hasOwnProperty(key)) && (key === email) && (JSON.parse(localStorage[key]).password === password);
  }
}
