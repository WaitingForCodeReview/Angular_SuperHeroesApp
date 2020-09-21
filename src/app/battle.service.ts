import { Injectable } from '@angular/core';
import {BattleInfo} from "./interfaces.config";

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  battles: Array<BattleInfo> = new Array<BattleInfo>()

  constructor() {
    this.initBattles();
  }

  // TEST FUNCTION
  initBattles(): void {
    // TEST FAKE-BATTLES FOR TEST TAB ONLY
    this.battles = [ ...this.battles,
      {
        battleDateTime: new Date(),
        heroName: 'Spider Man',
        enemyName: 'Batman',
        battleResult: 'WON',
      },
      {
        battleDateTime: new Date(Date.now() - 1111),
        heroName: 'Superman',
        enemyName: 'Big John',
        battleResult: 'LOST',
      },
      {
        battleDateTime: new Date(Date.now() + 9999),
        heroName: 'A-Bomb',
        enemyName: 'Enemy',
        battleResult: 'WON',
      },
      {
        battleDateTime: new Date(Date.now() - 9999),
        heroName: 'SuperGirl',
        enemyName: 'Enemy2',
        battleResult: 'WON',
      },
    ]
  }
}
