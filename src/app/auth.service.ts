import {Injectable} from "@angular/core";
import {HeroInfoObj} from "./hero-selection-page/hero-selection-page.component";

export interface FormData {
  email: string,
  userName: string,
  password: string,
  ownedHeroes: Array<HeroInfoObj>,
  lastSelectedHero: HeroInfoObj,
}

@Injectable({providedIn: 'root'})
export class AuthService {
  needToReLogin = false;
  private isAuth = false;

  login(formData: FormData): void {
    this.isAuth = true;
    this.clearLastSessionRecentSearches();
    this.currentUserInit(formData);
  }

  logout(): void {
    this.isAuth = false;
    localStorage.removeItem("currentUser");
  }

  isAuthenticated(): boolean {
    try{
      if (this.isExpiredSession()) {
        this.isAuth = false;
        this.logout();
        this.needToReLogin = true;
      } else {
        this.isAuth = true;
      }
    } catch (error) { }
    return this.isAuth;
  }

  isExpiredSession(): boolean {
    return parseInt(JSON.parse(localStorage.getItem('currentUser')).sessionExpTime) < Date.now();
  }

  currentUserInit(formData: FormData): void {
    const ONE_HOUR_MILLISECONDS = 3600000;

    localStorage.currentUser = JSON.stringify({
      ...formData,
      "sessionExpTime" : Date.now() + ONE_HOUR_MILLISECONDS,
      ownedHeroes: [],
      lastSelectedHero: {},
    });
  }

  clearLastSessionRecentSearches() {
    try {
      localStorage["recentSearches"] = [];
    } catch (error) { }
  }

}
