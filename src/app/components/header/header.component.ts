import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public homeActive: boolean;
  public campaingActive: boolean;
  public perfilActive: boolean;
  constructor() {
    this.homeActive = true;
    this.campaingActive = false;
    this.perfilActive = false;
  }

  ngOnInit(): void {}
}
