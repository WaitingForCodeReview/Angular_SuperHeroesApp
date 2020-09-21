import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  heroesListTab: string = 'HeroesList'
  historyTab: string = 'History'
  powerUpsTab: string = 'PowerUps'
  tabToShow: string = this.heroesListTab

  ngOnInit(): void {
  }

  showHeroesListTab() {
    this.tabToShow = this.heroesListTab;
  }

  showHistoryTab() {
    this.tabToShow = this.historyTab;
  }

  showPowerUpsTab() {
    this.tabToShow = this.powerUpsTab;
  }

}
