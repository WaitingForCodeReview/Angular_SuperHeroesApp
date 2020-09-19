import {Component, Input, OnInit} from '@angular/core';
import {HeroSelectionPageComponent} from "../hero-selection-page.component";
import {HeroInfo} from "../../interfaces.config";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {
  @Input() hero: HeroInfo

  isOwned: boolean

  ngOnInit(): void {
    this.checkOwned();
  }

  addHeroToOwned(): void {
    this.isOwned = true;
    HeroSelectionPageComponent.ownedHeroes = [ ...HeroSelectionPageComponent.ownedHeroes, this.hero ];
    HeroSelectionPageComponent.lastSelectedHero = this.hero;
    this.initOwnedHeroLocalSt();
  }

  initOwnedHeroLocalSt(): void {
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
