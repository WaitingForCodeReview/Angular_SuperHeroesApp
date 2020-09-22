import { Component, OnInit } from '@angular/core';
import { BattleService } from "../../battle.service";
import { AppConfig } from "../../app-config";


@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.css']
})
export class HistoryTabComponent implements OnInit {

  trackByFn = AppConfig.trackByFn;

  constructor(public battleService: BattleService) {}

  ngOnInit(): void {
    this.battleService.initBattles();
  }

  dateSort(): void {
    this.battleService.sort('date');
  }

  heroNameSort(): void {
    this.battleService.sort('heroName');
  }

  enemyNameSort(): void {
    this.battleService.sort('enemyName');
  }

  battleResultSort(): void {
    this.battleService.sort('battleResult');
  }

}
