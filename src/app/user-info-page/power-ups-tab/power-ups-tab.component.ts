import { Component, OnInit } from '@angular/core';
import { PowerUpsService } from "../../power-ups.service";
import { AppConfig } from "../../app-config";

@Component({
  selector: 'app-power-ups-tab',
  templateUrl: './power-ups-tab.component.html',
  styleUrls: ['./power-ups-tab.component.css']
})
export class PowerUpsTabComponent implements OnInit {

  trackByFn = AppConfig.trackByFn;

  constructor(public powerUpsService: PowerUpsService) { }

  ngOnInit(): void {
    this.sortPowerUps();
  }

  sortPowerUps() {
    this.powerUpsService.sort();
  }

}
