import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { HeroesService } from "./heroes.service";

@Injectable({
  providedIn: 'root'
})
export class BattleAccessGuard implements CanActivate {

  constructor(
    public heroesService: HeroesService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this.heroesService.initOwnedHeroesLocalStorage();
    if (this.heroesService.ownedHeroes.length) {
      return true;
    } else {
      this.router.navigate(['/main/hero-selection'], {
        queryParams: {
          noHeroFound: true,
        }
      })
    }
  }

}
