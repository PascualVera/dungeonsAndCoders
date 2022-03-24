import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enemy } from '../models/enemy';
import { Spell } from '../models/spell';
import { Weapon } from '../models/weapon';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  public enemyCampign: Enemy []
  public enemySpel: Spell []
  public enemyWeapon: Weapon []
  public url: string;

  constructor(private http: HttpClient) { 
    this.url = 'https://dungeons-and-coders-api.herokuapp.com'
  }

  getAllEnemy(idCampaignPre: number) {
    return this.http.get(this.url+'/vistaMaster?id='+idCampaignPre)
  }
}
