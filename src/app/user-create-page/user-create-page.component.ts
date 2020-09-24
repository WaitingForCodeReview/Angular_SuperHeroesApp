import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserCreateValidators } from "../user-create.validators";
import { FormData } from "../interfaces.config";
import { AppComponent } from "../app.component";

@Component({
  selector: 'app-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.css']
})
export class UserCreatePageComponent implements OnInit {
  form: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.formInit();
  }

  submit(): void {
    if(this.form.valid) {
      const formData: FormData = {...this.form.value};
      this.addUser(formData);
      this.form.reset();
    }
  }

  formInit(): void {
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

  invalidAndTouched(formControlName: string): boolean {
    return (this.form.get(formControlName).invalid) && (this.form.get(formControlName).touched);
  }

  isEmpty(formControlName: string): boolean {
    return this.form.get(formControlName).errors.required;
  }

  invalidFormat(formControlName: string): boolean {
    return (this.form.get(formControlName).errors.inValidFormat) && (!this.isEmpty(formControlName));
  }

  foundCoincidence(formControlName: string): boolean {
    return (this.form.get(formControlName).errors.foundCoincidence) && (!this.isEmpty(formControlName));
  }

  minLength(formControlName: string): boolean {
    return this.form.get(formControlName).errors.minlength;
  }

  isNotUnique(formControlName: string): boolean {
    return this.form.get(formControlName).errors.notUnique;
  }

  addUser(formData: FormData): void {
    AppComponent.users = [ ...AppComponent.users, formData ];
    localStorage['users'] = JSON.stringify(AppComponent.users);
  }

}
