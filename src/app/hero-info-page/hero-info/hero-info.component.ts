import { Component, OnInit } from '@angular/core';
import { HeroInfoService } from "../hero-info.service";
import { ActivatedRoute } from "@angular/router";
import { ApiResponse } from "../../variables.config";

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.css']
})
export class HeroInfoComponent implements OnInit {

  constructor(
    public heroInfoService: HeroInfoService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.renderHeroes();
  }

  renderHeroes(): void {
    this.route
      .queryParams
      .subscribe(params => {
        this.heroInfoService.heroSearchId = params['hero_id'];
      });
    this.heroInfoService.getHero()
      .subscribe(gotApiHeroesObj => {
        if (gotApiHeroesObj.response === ApiResponse.success) {
          this.heroInfoService.heroInfo = {
            ...gotApiHeroesObj,
          }
        }
      });
  }

}
