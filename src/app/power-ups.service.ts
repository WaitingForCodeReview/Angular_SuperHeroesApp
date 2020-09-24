import { Injectable } from '@angular/core';
import { AppConfig } from "./app-config";
import { PowerUp } from "./interfaces.config";



@Injectable({
  providedIn: 'root'
})
export class PowerUpsService {

  powerUps: PowerUp[] = AppConfig.powerUps()

  constructor() { }

  sort(): void {
    this.powerUps.sort( (a,b) => parseInt(b.usesLeft) - parseInt(a.usesLeft));
  }
}
