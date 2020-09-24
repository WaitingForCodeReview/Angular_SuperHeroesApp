import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-search',
  templateUrl: './recent-search.component.html',
  styleUrls: ['./recent-search.component.css']
})
export class RecentSearchComponent implements OnInit {

  @Input() search: string

  constructor() { }

  ngOnInit(): void {
  }

}
