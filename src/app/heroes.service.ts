import { Injectable } from '@angular/core';
import {ApiResponse, HeroInfo} from "./interfaces.config";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";

function Hero(apiObj) {
  Object.assign(this, {
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

  // initializes heroesArray with got json-heroes-data from api
  initHeroes(gotApiHeroesObj: any): void {
    gotApiHeroesObj.results.forEach( hero => {
      const tempHero: HeroInfo = new Hero(hero);

      if(tempHero.powerStats.intelligence !== 'null') {
        this.heroes = [ ...this.heroes, tempHero ]
      }
    })
  }
}
