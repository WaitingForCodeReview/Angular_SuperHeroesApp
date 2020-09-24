import { Component, Input, OnInit } from '@angular/core';
import { HeroesService } from "../../heroes.service";

@Component({
  selector: 'app-alphabetical-select',
  templateUrl: './alphabetical-select.component.html',
  styleUrls: ['./alphabetical-select.component.css']
})
export class AlphabeticalSelectComponent implements OnInit {

  @Input()letter: string

  constructor(public heroesService: HeroesService) { }

  ngOnInit(): void { }

  searchByClickedLetter(letterClicked: string): void {
    const url: string = this.heroesService.getUrl(letterClicked);

    this.heroesService.getHeroes(url);
  }
}
