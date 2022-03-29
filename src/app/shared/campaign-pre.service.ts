import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CampaignPre } from '../models/campaign-pre';

@Injectable({
  providedIn: 'root'
})
export class CampaignPreService {

  private url: string;
  public actualCampaignPre: CampaignPre;

  constructor(private http: HttpClient) { 
    this.url = 'https://dungeons-and-coders-api.herokuapp.com';
    // this.url = 'http://localhost:4000';
  }

  //Recuperar todas las campañas predefinicdas
  getAllCampaigns() {
    return this.http.get(this.url + '/campaignPre')
  }

  getCampaignPreById(idCampaignPre: number) {
    return this.http.get(this.url + '/campaignPre?idCampaignPre=' + idCampaignPre)
  }
}
