import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignPreService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'https://dungeons-and-coders-api.herokuapp.com';
    // this.url = 'http://localhost:4000';
  }

  //Recuperar todas las campañas predefinicdas
  getAllCampaigns() {
    return this.http.get(this.url + '/campaignPre')
  }
}
