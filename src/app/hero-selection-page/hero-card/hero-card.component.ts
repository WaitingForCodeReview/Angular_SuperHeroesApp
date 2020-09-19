import {Component, Input, OnInit} from '@angular/core';
import {HeroInfoObj, HeroSelectionPageComponent} from "../hero-selection-page.component";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {
  @Input() hero: HeroInfoObj

  isOwned: boolean

  constructor() { }

  ngOnInit(): void {
    this.checkOwned();
  }

  addHeroToOwned(): void {
    this.isOwned = true;
    HeroSelectionPageComponent.ownedHeroes.push(this.hero);
    HeroSelectionPageComponent.lastSelectedHero = this.hero;
    this.initOwnedHeroLocalSt();
  }

  initOwnedHeroLocalSt() {
    localStorage["currentUser"] = JSON.stringify({
      ...JSON.parse(localStorage["currentUser"]),
      ownedHeroes: HeroSelectionPageComponent.ownedHeroes,
      lastSelectedHero: HeroSelectionPageComponent.lastSelectedHero,
    })
  }

  checkOwned(): void {
    try {
      this.isOwned = HeroSelectionPageComponent.ownedHeroes.some(item => item.name === this.hero.name);
    } catch (error) { }
  }

}
