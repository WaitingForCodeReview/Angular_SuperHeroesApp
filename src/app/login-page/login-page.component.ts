import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
      ])
    });
  }

  submit() {
    if(this.form.valid) {
      console.log('Form ', this.form);
      const formData = {...this.form.value};

      console.log('Data', formData);
    }
  }

}
