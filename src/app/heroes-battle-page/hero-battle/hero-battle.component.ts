import { Component, OnInit } from '@angular/core';
import { BattleService } from "../../battle.service";
import { HeroInfoService } from "../../hero-info-page/hero-info.service";
import { PowerUp } from "../../interfaces.config";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

@Component({
  selector: 'app-hero-battle',
  templateUrl: './hero-battle.component.html',
  styleUrls: ['./hero-battle.component.css']
})
export class HeroBattleComponent implements OnInit {

  availablePowerUps: PowerUp[]
  showLoader: boolean = false
  showModal: boolean = false

  constructor(
    public battleService: BattleService,
    public heroInfoService: HeroInfoService,
  ) { }

  ngOnInit(): void {
    this.battleService.initValuesLocalStorage();
    this.initAvailablePowerUps();
    this.battleService.initBattles();
  }

  initAvailablePowerUps(): void {
    this.availablePowerUps = this.battleService.powerUpsService.powerUps.filter( powerUp => {
      return +powerUp.usesLeft;
    })
  }

  powerUpClicked(powerUp: PowerUp):void {
    if(+powerUp.usesLeft) {
      this.battleService.usedInBattlePowerUps.find(item => item.title === powerUp.title)
        ? this.battleService.removePowerUp(powerUp)
        : this.battleService.addPowerUp(powerUp);
    }
  }

  needsColor(powerUp: PowerUp): boolean {
    return !!this.battleService.usedInBattlePowerUps.find( item => item.title === powerUp.title);
  }

  fightButtonClicked(): void {
    this.showLoader = true;
    this.battleService.fight()
    this.delay()
  }

  delay(): void {
    of(false).pipe(
      delay(5500),
    ).subscribe(toShow => {
      this.showLoader = toShow;
    }).add( () => this.initAvailablePowerUps() )
      .add( () => this.showModal = true );
  }

  hideModal(): void {
    this.showModal = false;
  }

}
