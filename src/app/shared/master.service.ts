import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enemy } from '../models/enemy';
import { Spell } from '../models/spell';
import { Weapon } from '../models/weapon';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  public url: string;

  constructor(private http: HttpClient) { 
    this.url = 'https://dungeons-and-coders-api.herokuapp.com'
  }

  getAllEnemy(idCampaignPre: number) {
    return this.http.get(this.url+'/enemigo?id='+idCampaignPre)
  }

  getAllEquip(idEnemyPre: number){
    return this.http.get(this.url+'/equip/enemy?id='+idEnemyPre)
  }

  getAllSpell(idEnemyPre: number){
    return this.http.get(this.url+'/spell/enemy?id='+idEnemyPre)
  }

  getPlayerHitPoints(idCampaign:string){
    return this.http.get(this.url+'/vistaMaster/player?id='+idCampaign)
  }

  getEnemyHitPoints(idCampaign: string){
    return this.http.get(this.url+'/vistaMaster/enemy?id='+idCampaign)
  }
}
