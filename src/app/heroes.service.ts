import { Injectable } from '@angular/core';
import { ApiResponse, HeroInfo } from "./interfaces.config";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";

function Hero(apiObj) {
  Object.assign(this, {
    id: apiObj.id,
    name: apiObj.name,
    imageUrl: apiObj.image.url,
    powerStats: {
      ...Object.assign({}, apiObj.powerstats)
    }
  })
}

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  searchSucceed: boolean = false
  accessToken: string = '2838684283046319'
  heroes: Array<HeroInfo> = new Array<HeroInfo>()
  ownedHeroes: Array<HeroInfo> = new Array<HeroInfo>()
  lastSelectedHero: HeroInfo
  enemyHero: HeroInfo
  lastSearch: string = ''

  constructor(private http: HttpClient) {}

  // creates the url using api token and searchValue
  getUrl(searchValue: string): string {
    return `https://www.superheroapi.com/api.php/${this.accessToken}/search/${searchValue}`;
  }

  // gets heroes from api by generated url (json format)
  getHeroes(url: string): Subscription {
   return this.http.get<ApiResponse>(url)
      .subscribe(gotApiHeroesObj => {
        if (gotApiHeroesObj.response === "success") {
          this.heroes = [];
          this.searchSucceed = true;
          this.initHeroes(gotApiHeroesObj);
        } else {
          this.searchSucceed = false;
        }
      });
  }

  // initializes heroesArray and local storage with got json-heroes-data from api
  initHeroes(gotApiHeroesObj: any): void {
    gotApiHeroesObj.results.forEach( hero => {
      const tempHero: HeroInfo = new Hero(hero);

      if(tempHero.powerStats.intelligence !== 'null') {
        this.heroes = [ ...this.heroes, tempHero ]
      }
    })

    this.setEnemyHero()
    this.setSearchedHeroesLocalStorage();
  }

  initOwnedHeroesLocalStorage(): void {
    try {
      this.ownedHeroes = JSON.parse(localStorage["currentUser"]).ownedHeroes;
      this.lastSelectedHero = JSON.parse(localStorage["currentUser"]).lastSelectedHero;
    } catch (error) {}
  }

  removeFromOwned(heroName: string): void {
    this.ownedHeroes = this.ownedHeroes.filter( (item) => {
      return item.name !== heroName;
    });
  }

  resetLastSelectedHero(): void {
    const lastOwnedElement = this.ownedHeroes.length - 1;

    this.lastSelectedHero = this.ownedHeroes[lastOwnedElement];
  }

  initSearchedHeroesLocalStorage(): void {
    try {
      this.heroes = JSON.parse(localStorage["currentUser"]).searchedHeroes;
      this.setEnemyHero()
    } catch (error) {}
  }

  setSearchedHeroesLocalStorage(): void {
    localStorage["currentUser"] = JSON.stringify({
      ...JSON.parse(localStorage["currentUser"]),
      searchedHeroes: this.heroes,
    })
  }

  initLastSearchLocalStorage(): void {
    try {
      this.lastSearch = JSON.parse(localStorage["currentUser"]).lastSearch;
    } catch (error) {}
  }

  setLastSearchLocalStorage(): void {
    localStorage["currentUser"] = JSON.stringify({
      ...JSON.parse(localStorage["currentUser"]),
      lastSearch: this.lastSearch,
    })
  }

  setEnemyHero() {
    try {
      do {
        this.enemyHero = this.heroes[Math.floor(Math.random() * (this.heroes.length))];
      } while (this.enemyHero.name === this.lastSelectedHero.name)

      localStorage["currentUser"] = JSON.stringify({
        ...JSON.parse(localStorage["currentUser"]),
        enemyHero: this.enemyHero,
      })
    } catch (error) {}
  }
}
