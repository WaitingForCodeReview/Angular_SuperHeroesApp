import { Injectable } from '@angular/core';
import { BattleInfo, BattleResults, HeroInfo, PowerUp } from "./interfaces.config";
import { PowerUpsService } from "./power-ups.service";

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  battles: BattleInfo[] = new Array<BattleInfo>()
  userHero: HeroInfo
  enemyHero: HeroInfo
  usedInBattlePowerUps: PowerUp[] = new Array<PowerUp>()
  currentBattle: BattleInfo

  constructor( public powerUpsService: PowerUpsService ) {}

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

  initValuesLocalStorage(): void {
    this.userHero = JSON.parse(localStorage["currentUser"]).lastSelectedHero;
    this.enemyHero = JSON.parse(localStorage["currentUser"]).enemyHero;
  }

  addPowerUp(powerUp: PowerUp): void {
    const powerStatToUpgrade: string = powerUp.powerStatName;

    this.addPowerUpToArray(powerUp)
    this.remakeHero(powerUp, powerStatToUpgrade, 'upgrade');
  }

  removePowerUp(powerUp: PowerUp): void {
    const powerStatToUpgrade: string = powerUp.powerStatName;

    this.removePowerUpFromArray(powerUp);
    this.remakeHero(powerUp, powerStatToUpgrade, 'downgrade');
  }

  fight(): void {
    this.setBattle(this.battleResult());
    this.refreshPowerUps();
  }

  battleResult(): string {
    const battleResults: BattleResults = this.compareAllPowerStats();

    return (battleResults.userScore === battleResults.enemyScore)
      ? 'DRAW'
      : (battleResults.userScore > battleResults.enemyScore)
        ? 'WON'
        : 'LOST';
  }

  compareAllPowerStats(): BattleResults {
    const battleResults: BattleResults = {
      userScore: 0,
      enemyScore: 0,
    }

    return this.battleResults(battleResults);
  }

  battleResults(battleResults: BattleResults): BattleResults {
    Object.keys(this.userHero.powerStats).forEach( powerStat => {
      const userPSValue: number = parseInt(this.userHero.powerStats[powerStat]);
      const enemyPSValue: number = parseInt(this.enemyHero.powerStats[powerStat]);

      if (userPSValue > enemyPSValue) {
        battleResults.userScore++;
      } else if (userPSValue < enemyPSValue) {
        battleResults.enemyScore++;
      }
    });

    return battleResults;
  }

  setBattle(result: string): void {
    this.currentBattle = {
      battleDateTime: Date.now(),
      heroName: this.userHero.name,
      heroId: this.userHero.id,
      enemyName: this.enemyHero.name,
      enemyId: this.enemyHero.id,
      battleResult: result,
    }

    this.battles = [...this.battles, this.currentBattle];
    this.initBattlesLocalStorage();
  }

  initBattlesLocalStorage(): void {
    localStorage["currentUser"] = JSON.stringify({
      ...JSON.parse(localStorage["currentUser"]),
      battles: this.battles,
    });
  }

  initBattles(): void {
    try {
      if(!!JSON.parse(localStorage["currentUser"]).battles) {
        this.battles = JSON.parse(localStorage["currentUser"]).battles;
      } else {
        this.battles = [];
      }
    } catch (error) {}
  }

  refreshPowerUps(): void {
    this.usedInBattlePowerUps.forEach( usedPowerUp => {
      const toDecrease = this.powerUpsService.powerUps.find( powerUp => powerUp.title === usedPowerUp.title);
      toDecrease.usesLeft = (parseInt(toDecrease.usesLeft) - 1).toString();

      this.removePowerUp(usedPowerUp);
    })
  }

  addPowerUpToArray(powerUp: PowerUp): void {
    this.usedInBattlePowerUps = [ ...this.usedInBattlePowerUps, powerUp];
  }

  removePowerUpFromArray(powerUp: PowerUp): void {
    this.usedInBattlePowerUps = this.usedInBattlePowerUps.filter( item => item.title !== powerUp.title);
  }

  remakeHero(powerUp: PowerUp, powerStatToUpgrade: string, toDo: string): void {
    switch (toDo) {
      case 'upgrade':
        this.userHero.powerStats[powerStatToUpgrade] =
          (parseInt(this.userHero.powerStats[powerStatToUpgrade]) +  parseInt(powerUp.powerStatUpgradeValue)).toString();
        break;
      case 'downgrade':
        this.userHero.powerStats[powerStatToUpgrade] =
          (parseInt(this.userHero.powerStats[powerStatToUpgrade]) -  parseInt(powerUp.powerStatUpgradeValue)).toString();
        break;
    }
  }

}
