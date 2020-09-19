import { Component } from '@angular/core';
import {FormData} from "./interfaces.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-superHeroesApp';

  static users: Array<FormData> = localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : [];
}
