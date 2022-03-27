import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CampaignMap } from '../models/campaign-map';

@Injectable({
  providedIn: 'root'
})
export class CampaignMapService {

  public campaignMaps: CampaignMap[];
  public activeMap: CampaignMap;
  public url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://dungeons-and-coders-api.herokuapp.com';
    // this.url = 'http://localhost:4000'

    this.campaignMaps = [];
    this.activeMap = new CampaignMap();
   }

   getMaps(idCampaignPre: number) {
    return this.http.get(this.url + `/map?idCampaignPre=${idCampaignPre}` )
   }
}
