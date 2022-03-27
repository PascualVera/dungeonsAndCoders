import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campaing } from '../models/campaing';

@Injectable({
  providedIn: 'root'
})
export class CampaingService {
  public idCampaign: string; // TODO: Eliminar cuando no tenga referencias
  public actualCampaign: Campaing;
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://dungeons-and-coders-api.herokuapp.com';
    // this.url = 'http://localhost:4000';

    this.actualCampaign = new Campaing();
   
  }

  //Recuperar todas las campañas
  getAllCampaigns() {
    return this.http.get(this.url + '/campaign')
  }
  
  getCampaignById(idCampaign: string) {
    return this.http.get(this.url + '/campaign?idCampaign=' + idCampaign)
  }
  
  postCampaign(campaign: Campaing) {
    return this.http.post(this.url + '/campaign', campaign)
  }

  putCampaing(campaign:object){
    return this.http.put(this.url + '/campaign', campaign)
  }
  
  deleteCampaign(idCampaign: string) {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: { idCampaign: idCampaign},
    };
    return this.http.delete(this.url + '/campaign', options)
  }

}
