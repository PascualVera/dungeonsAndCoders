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

  constructor(private http: HttpClient) { }

  getAllEnemy(idCampaignPre: number) {
    return this.http.get('https://dungeons-and-coders-api.herokuapp.com/vistaMaster')
  }
}
