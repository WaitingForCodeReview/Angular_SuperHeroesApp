import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserCreateValidators} from "../user-create.validators";

@Component({
  selector: 'app-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.css']
})
export class UserCreatePageComponent implements OnInit {
  form: FormGroup

  constructor() { }

  ngOnInit() {
    this.formInit();
  }

  submit() {
    if(this.form.valid) {
      const formData = {...this.form.value};
      localStorage.setItem(formData.email, JSON.stringify({
        userName: formData.userName,
        password: formData.password
      }))
      this.form.reset();
    }
  }

  formInit() {
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        UserCreateValidators.validUserName,
      ]),
      email: new FormControl('', [
        Validators.required,
        UserCreateValidators.validEmail,
        UserCreateValidators.checkUniqueEmail,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        UserCreateValidators.checkCoincidence,
        UserCreateValidators.validPassword,
      ])
    });
  }

  invalidAndTouched(formControlName: string) {
    return (this.form.get(formControlName).invalid) && (this.form.get(formControlName).touched);
  }

  isEmpty(formControlName: string) {
    return this.form.get(formControlName).errors.required;
  }

  invalidFormat(formControlName: string) {
    return (this.form.get(formControlName).errors.inValidFormat) && (!this.isEmpty(formControlName));
  }

  foundCoincidence(formControlName: string) {
    return (this.form.get(formControlName).errors.foundCoincidence) && (!this.isEmpty(formControlName));
  }

  minLength(formControlName: string) {
    return this.form.get(formControlName).errors.minlength;
  }

  isNotUnique(formControlName: string) {
    return this.form.get(formControlName).errors.notUnique;
  }
}
