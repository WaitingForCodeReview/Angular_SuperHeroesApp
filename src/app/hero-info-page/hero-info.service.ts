import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { ApiObject} from "../interfaces.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroInfoService {

  heroSearchId: string
  accessToken: string = '2838684283046319'
  heroInfo: ApiObject

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  redirectToHeroInfo(heroId: string): void {
    this.heroInfo = null;

    this.router.navigate(['main/hero-info'], {
      queryParams: {
        hero_id: heroId
      }
    });
  }

  getUrl(): string {
    return `https://www.superheroapi.com/api.php/${this.accessToken}/${this.heroSearchId}`;
  }

  getHero(url: string = this.getUrl()): Observable<ApiObject> {
    return this.http.get<ApiObject>(url);
  }
}
