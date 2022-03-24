import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaing } from '../models/campaing';

@Injectable({
  providedIn: 'root'
})
export class CampaingService {

  public idCampaign: string; // Tendrá el idCampaign despues de join o unirse por código
  private url: string;

  // para refactorizar
  public campaing: Campaing
  public activeMap: any
  public campaingCode: string
  constructor(private http: HttpClient) {
    this.url = 'https://dungeons-and-coders-api.herokuapp.com';
    // this.url = 'http://localhost:4000';

    // Provisonal para hardcorear los mapas: luego en servicios map con su endpoint
    this.campaingCode = 'Campaña prueba'
    this.campaing = new Campaing('Ladrones de sueños', [{
      name: 'Tybra',
      url: '../../assets/images/Mapas/ladronesDeSueños/Tybra.png'
    }, {
      name: 'Camino',
      url: '../../assets/images/Mapas/ladronesDeSueños/Camino.png'
    }, {
      name: 'Mansion',
      url: '../../assets/images/Mapas/ladronesDeSueños/mansion.png'
    }])
    this.activeMap = this.campaing.maps[0]
  }




  //Recuperar todas las campañas
  getAllCampaigns() {
    return this.http.get(this.url + '/campaign')
  }
  
  getCampaignById(idCampaign: string) {
    return this.http.get(this.url + '/campaign?idCampaign=' + idCampaign)
  }
}
