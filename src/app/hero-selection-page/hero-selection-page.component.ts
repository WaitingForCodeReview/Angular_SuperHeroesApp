import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserCreateValidators} from "../user-create.validators";
import {HeroInfo} from "../interfaces.config";

function Hero(apiObj) {
  Object.assign(this, {
    name: apiObj.name,
    imageUrl: apiObj.image.url,
    powerStats: {
      ...Object.assign({}, apiObj.powerstats)
    }
  })
}

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.css']
})
export class HeroSelectionPageComponent implements OnInit {

  form: FormGroup
  accessToken: string = '2838684283046319'
  heroes: Array<HeroInfo> = new Array<HeroInfo>()
  recentSearches: Set<string> = new Set()

  static ownedHeroes: Array<HeroInfo> = new Array<HeroInfo>()
  static lastSelectedHero: HeroInfo

  ngOnInit(): void {
    this.initRecentSearches();
    this.initOwnedHeroes();
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
      const tempHero: HeroInfo = new Hero(hero);

      if(tempHero.powerStats.intelligence !== 'null') {
        this.heroes = [ ...this.heroes, tempHero ]
      }
    })
  }

  // updates recentSearchesArray by adding new search
  updateRecentSearches(heroSearchValue: string): void {
    this.recentSearches = new Set([ ...this.recentSearches, heroSearchValue]);
    localStorage.setItem("recentSearches", JSON.stringify([ ...this.recentSearches.values() ]));
  }

  searchByRecent(event): void {
    const target = event.target;

    this.form.controls.heroSearch.setValue(target.innerText);
    this.submit();
  }

}
