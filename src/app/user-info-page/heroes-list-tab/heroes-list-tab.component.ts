import { Component, OnInit } from '@angular/core';
import {HeroesService} from "../../heroes.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-heroes-list-tab',
  templateUrl: './heroes-list-tab.component.html',
  styleUrls: ['./heroes-list-tab.component.css']
})
export class HeroesListTabComponent implements OnInit {

  constructor(public heroesService: HeroesService, private router: Router) { }

  ngOnInit(): void {
  }

  redirectToHeroSelect() {
    this.router.navigate(['main/hero-selection']);
  }

}
