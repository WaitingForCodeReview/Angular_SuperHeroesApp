import { Injectable } from '@angular/core';
import { BattleInfo } from "./interfaces.config";

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  battles: BattleInfo[] = new Array<BattleInfo>()

  sort(sortBy: string): void {
    switch (sortBy) {
      case 'date':
        this.battles.sort( (a,b) =>  a.battleDateTime - b.battleDateTime);
        break;

      case 'heroName':
      case 'enemyName':
        this.battles.sort( (a,b) => a[sortBy].localeCompare(b[sortBy]) );
        break;

      case 'battleResult':
        this.battles.sort( (a,b) => b.battleResult.localeCompare(a.battleResult) );
        break;
    }
  }

  // TEST FUNCTION
  initBattles(): void {
    // TEST FAKE-BATTLES FOR TEST TAB ONLY
    this.battles = [
      {
        battleDateTime: new Date(),
        heroName: 'Spider Man',
        heroId: '1',
        enemyName: 'Batman',
        enemyId: '2',
        battleResult: 'WON',
      },
      {
        battleDateTime: new Date(Date.now() - 1111),
        heroName: 'Superman',
        heroId: '3',
        enemyName: 'Big John',
        enemyId: '4',
        battleResult: 'LOST',
      },
      {
        battleDateTime: new Date(Date.now() + 9999),
        heroName: 'A-Bomb',
        heroId: '5',
        enemyName: 'Enemy',
        enemyId: '6',
        battleResult: 'WON',
      },
      {
        battleDateTime: new Date(Date.now() - 9999),
        heroName: 'SuperGirl',
        heroId: '7',
        enemyName: 'Enemy2',
        enemyId: '8',
        battleResult: 'WON',
      },
    ]
  }
}
