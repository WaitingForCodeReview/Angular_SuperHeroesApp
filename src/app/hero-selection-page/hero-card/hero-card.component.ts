import {Component, Input, OnInit} from '@angular/core';
import {HeroInfo} from "../../interfaces.config";
import {HeroesService} from "../../heroes.service";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {
  @Input() hero: HeroInfo

  isOwned: boolean

  constructor(public heroesService: HeroesService) {}

  ngOnInit(): void {
    this.checkOwned();
  }

  addHeroToOwned(): void {
    this.isOwned = true;
    this.heroesService.ownedHeroes = [ ...this.heroesService.ownedHeroes, this.hero ];
    this.heroesService.lastSelectedHero = this.hero;
    this.initOwnedHeroLocalSt();
  }

  removeHeroFromOwned(): void {
    this.isOwned = false;
    this.heroesService.ownedHeroes = this.heroesService.ownedHeroes.filter( (item) => {
      return item.name !== this.hero.name;
    });
    this.heroesService.lastSelectedHero = null;
    this.initOwnedHeroLocalSt();
  }

  initOwnedHeroLocalSt(): void {
    localStorage["currentUser"] = JSON.stringify({
      ...JSON.parse(localStorage["currentUser"]),
      ownedHeroes: this.heroesService.ownedHeroes,
      lastSelectedHero: this.heroesService.lastSelectedHero,
    })
  }

  checkOwned(): void {
    try {
      this.isOwned = this.heroesService.ownedHeroes.some(item => item.name === this.hero.name);
    } catch (error) { }
  }

}
