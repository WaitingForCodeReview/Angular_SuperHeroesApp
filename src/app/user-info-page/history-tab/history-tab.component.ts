import { Component, OnInit } from '@angular/core';
import {BattleService} from "../../battle.service";

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.css']
})
export class HistoryTabComponent implements OnInit {

  constructor(public battleService: BattleService) { }

  ngOnInit(): void {
  }

  dateSort(): any {
    this.battleService.battles.sort( (a,b) =>  a.battleDateTime - b.battleDateTime);
  }

  heroNameSort(): void {
    this.battleService.battles.sort( (a,b) => a.heroName.localeCompare(b.heroName) );
  }

  enemyNameSort(): void {
    this.battleService.battles.sort( (a,b) => a.enemyName.localeCompare(b.enemyName) );
  }

  battleResultSort(): void {
    this.battleService.battles.sort( (a,b) => ~(a.battleResult.localeCompare(b.battleResult)) );
  }

}
