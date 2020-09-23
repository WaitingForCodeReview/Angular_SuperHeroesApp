import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserCreateValidators } from "../user-create.validators";
import { HeroesService } from "../heroes.service";
import { AppConfig } from "../app-config";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.css']
})
export class HeroSelectionPageComponent implements OnInit {

  form: FormGroup
  recentSearches: Set<string> = new Set()
  showAlphabetical: boolean = false
  alphabet: string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  circleLetter: string = 'a';
  trackByFn = AppConfig.trackByFn;
  noHeroFound: boolean

  constructor(
    public heroesService: HeroesService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initRecentSearches();
    this.initOwnedHeroes();
    this.formInit();
    this.route
      .queryParams
      .subscribe(params => {
        this.noHeroFound = params['noHeroFound'];
      });
  }

  initRecentSearches(): void {
    try {
      JSON.parse(localStorage["recentSearches"]).forEach(item => this.recentSearches.add(item));
    } catch (error) { }
  }

  initOwnedHeroes(): void {
    this.heroesService.ownedHeroes = JSON.parse(localStorage["currentUser"]).ownedHeroes
    this.heroesService.lastSelectedHero = JSON.parse(localStorage["currentUser"]).lastSelectedHero;
  }

  formInit(): void {
    this.form = new FormGroup({
      heroSearch: new FormControl(this.heroesService.lastSearch, [
        Validators.required,
        UserCreateValidators.heroSearchValidator,
      ]),
    });
  }

  submit(): void {
    if(this.form.valid) {
      const heroSearchValue = this.form.value.heroSearch;
      const url = this.heroesService.getUrl(heroSearchValue);

      this.heroesService.lastSearch = heroSearchValue;
      this.heroesService.setLastSearchLocalStorage();
      this.heroesService.getHeroes(url).add( () => {
        if (this.heroesService.searchSucceed) {
          this.updateRecentSearches(heroSearchValue);
        }
      });
      this.showAlphabetical = false;
    }
  }

  updateRecentSearches(heroSearchValue: string): void {
    this.recentSearches = new Set([ ...this.recentSearches, heroSearchValue]);
    localStorage.setItem("recentSearches", JSON.stringify([ ...this.recentSearches.values() ]));
  }

  searchByRecent(event): void {
    console.log(this.noHeroFound)
    const target = event.target;

    this.form.controls.heroSearch.setValue(target.innerText);
    this.submit();
  }

  letterClicked(letter: string): void {
    this.circleLetter = letter;
    this.showAlphabetical = false;
    this.form.controls.heroSearch.setValue(letter);
    this.heroesService.lastSearch = letter;
    this.heroesService.setLastSearchLocalStorage();
  }

  hideUnhideAlphabetical(): void {
    this.showAlphabetical = !this.showAlphabetical
  }

  showModal(): boolean {
    if (this.heroesService.ownedHeroes.length >= 1) {
      return false;
    }
    else if (this.heroesService.ownedHeroes.length === 0 && !!this.noHeroFound) {
      return true;
    }
    return !!this.noHeroFound;
  }
}
