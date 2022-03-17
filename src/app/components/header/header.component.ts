import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public homeActive: boolean;
  public campaingActive: boolean;
  public perfilActive: boolean;
  constructor(public router:Router) {
    this.homeActive = true;
    this.campaingActive = false;
    this.perfilActive = false;
  }
  switchHome(home: HTMLElement, campaing: HTMLElement, perfil: HTMLElement) {
   
      home.setAttribute('class','navItemAlt')
      campaing.setAttribute('class','navItem')
      perfil.setAttribute('class','navItem')
      console.log(this.router.routerState.snapshot.url)
    
  }
  switchCampaing( home: HTMLElement, campaing: HTMLElement, perfil: HTMLElement) {
      home.setAttribute('class','navItem')
      campaing.setAttribute('class','navItemAlt')
      perfil.setAttribute('class','navItem')
      
  }
  switchPerfil(home: HTMLElement, campaing: HTMLElement, perfil: HTMLElement) {
      home.setAttribute('class','navItem')
      campaing.setAttribute('class','navItem')
      perfil.setAttribute('class','navItemAlt')
  }
  ngOnInit(): void {}
}
