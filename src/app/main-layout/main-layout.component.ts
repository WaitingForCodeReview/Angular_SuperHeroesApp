import { Component, OnInit } from '@angular/core';
import {HeroesService} from "../heroes.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.initOwnedHeroesLocalStorage();
    this.heroesService.initSearchedHeroesLocalStorage();
    this.heroesService.initLastSearchLocalStorage();
  }

}
