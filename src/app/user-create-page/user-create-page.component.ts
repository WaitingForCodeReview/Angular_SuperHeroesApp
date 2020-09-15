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
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        UserCreateValidators.validUserName,
        ]),
      email: new FormControl('', [
        Validators.required,
        UserCreateValidators.checkDomain,
        UserCreateValidators.checkAfterAt,
        UserCreateValidators.checkDots,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        UserCreateValidators.oneUpperLetter,
        UserCreateValidators.oneDigit,
        UserCreateValidators.oneSpecialSymbol,
        UserCreateValidators.checkCoincidence,
      ])
    });
  }

  submit() {
    if(this.form.valid) {
      console.log('Form ', this.form);
      const formData = {...this.form.value};

      console.log('Data', formData);
      this.form.reset();
    }
  }

}
