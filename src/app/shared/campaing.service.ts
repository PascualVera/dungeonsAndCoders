import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaing } from '../models/campaing';

@Injectable({
  providedIn: 'root'
})
export class CampaingService {
  [x: string]: any;
  public campaing: Campaing
  public activeMap: any
  public campaingCode:string
  private url:string;
  constructor(private http: HttpClient) {
    this.url = 'https://dungeons-and-coders-api.herokuapp.com'
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
   //Mostrar ultimas 5 partidas
   getCampaign(){
     return this.http.get(this.url+ `/campaign`)
   }
}
