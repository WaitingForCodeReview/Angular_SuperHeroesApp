import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserCreateValidators} from "../user-create.validators";

export interface HeroInfoObj {
  name: string,
  imageUrl: string,
  powerStats: {
    intelligence: string,
    strength: string,
    speed: string,
    durability: string,
    power: string,
    combat: string,
  }
}

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.css']
})
export class HeroSelectionPageComponent implements OnInit {

  form: FormGroup
  accessToken: string = '2838684283046319'
  heroes: Array<HeroInfoObj> = new Array<HeroInfoObj>()
  recentSearches: Set<string> = new Set()

  static ownedHeroes: Array<HeroInfoObj> = new Array<HeroInfoObj>()
  static lastSelectedHero: HeroInfoObj

  constructor() {
    this.initRecentSearches();
    this.initOwnedHeroes();
  }

  ngOnInit(): void {
    this.formInit();
  }

  initRecentSearches(): void {
    try {
      JSON.parse(localStorage["recentSearches"]).forEach(item => this.recentSearches.add(item));
    } catch (error) { }
  }

  initOwnedHeroes(): void {
    HeroSelectionPageComponent.ownedHeroes = JSON.parse(localStorage["currentUser"]).ownedHeroes
    HeroSelectionPageComponent.lastSelectedHero = JSON.parse(localStorage["currentUser"]).lastSelectedHero;
  }

  formInit(): void {
    this.form = new FormGroup({
      heroSearch: new FormControl('', [
        Validators.required,
        UserCreateValidators.heroSearchValidator,
      ]),
    });
  }

  submit(): void {
    if(this.form.valid) {
      const heroSearchValue = this.form.value.heroSearch;
      const url = this.getUrl(heroSearchValue);

      this.getHeroes(url, heroSearchValue);
    }
  }

  // creates the url using api token and searchValue
  getUrl(searchValue: string): string {
    return `https://www.superheroapi.com/api.php/${this.accessToken}/search/${searchValue}`;
  }

  // gets heroes from api by generated url (json format)
  getHeroes(url: string, heroSearchValue: string): void {
    fetch(url)
      .then(response => response.json())
      .then(gotApiHeroesObj => {
        if (gotApiHeroesObj.response === "success") {
          this.updateRecentSearches(heroSearchValue);
          this.heroes = [];
          this.initHeroes(gotApiHeroesObj);
        }
      });
  }

  // initializes heroesArray with got json-heroes-data from api
  initHeroes(gotApiHeroesObj: any): void {
    gotApiHeroesObj.results.forEach( hero => {
      const tempHero: HeroInfoObj = {
        name: hero.name,
        imageUrl: hero.image.url,
        powerStats: {
          intelligence: hero.powerstats.intelligence,
          strength: hero.powerstats.strength,
          speed: hero.powerstats.speed,
          durability: hero.powerstats.durability,
          power: hero.powerstats.power,
          combat: hero.powerstats.combat,
        }
      }
      if(tempHero.powerStats.intelligence !== 'null') {
        this.heroes.push(tempHero);
      }
    })
  }

  // updates recentSearchesArray by adding new search
  updateRecentSearches(heroSearchValue: string): void {
    this.recentSearches.add(heroSearchValue);
    localStorage.setItem("recentSearches", JSON.stringify(Array.from(this.recentSearches.values())));
  }

  searchByRecent(event): void {
    const target = event.target;

    this.form.controls.heroSearch.setValue(target.innerText);
    this.submit();
  }

}
