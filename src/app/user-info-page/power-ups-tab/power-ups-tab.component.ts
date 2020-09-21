import { Component, OnInit } from '@angular/core';
import {PowerUpsService} from "../../power-ups.service";

@Component({
  selector: 'app-power-ups-tab',
  templateUrl: './power-ups-tab.component.html',
  styleUrls: ['./power-ups-tab.component.css']
})
export class PowerUpsTabComponent implements OnInit {

  constructor(public powerUpsService: PowerUpsService) { }

  ngOnInit(): void {
    this.powerUpsService.powerUps.sort( (a,b) => ~(parseInt(a.usesLeft) - parseInt(b.usesLeft)))
  }

}
