import { Injectable } from '@angular/core';
import { CampaignHome } from '../models/campaign-home';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignHomeService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = 'https://dungeons-and-coders-api.herokuapp.com'
  }

  getLastCampaigns() {
    return this.http.get(this.url + `/homepage`)
  }
}
