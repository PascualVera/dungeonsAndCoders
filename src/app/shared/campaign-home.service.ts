import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CampaignHomeService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'https://dungeons-and-coders-api.herokuapp.com'
  }

  getLastCampaigns() {
    return this.http.get(this.url + '/homepage')
  }
}
