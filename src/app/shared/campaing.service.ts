import { Injectable } from '@angular/core';
import { Campaing } from '../models/campaing';

@Injectable({
  providedIn: 'root'
})
export class CampaingService {
  public campaing: Campaing
  public activeMap: any
  public campaingCode:string
  constructor() {
    this.campaingCode = 'Campaña prueba'
    this.campaing = new Campaing('Ladrones de sueños',[{
      name:'Tybra',
      url:'../../assets/images/Mapas/ladronesDeSueños/Tybra.png'
    },{
      name:'Camino',
      url:'../../assets/images/Mapas/ladronesDeSueños/Camino.png'
    },{
      name:'Mansion',
      url:'../../assets/images/Mapas/ladronesDeSueños/mansion.png'
    }])
    this.activeMap = this.campaing.maps[0]
   }
}
