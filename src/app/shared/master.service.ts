import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  public url: string;
  public hitPoints: any[];
  public characterPlayer: any [];

  constructor(private http: HttpClient) { 
    this.url = 'https://dungeons-and-coders-api.herokuapp.com';
    this.hitPoints= [{idEnemy: 0,idPlayer: 0, name: '', character: '', hitPoints: 0}];
    this.characterPlayer = [{nameCharacter: '', namePlayer: ''}]
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

  getManual(idCampaign:string){
    return this.http.get(this.url+'/vistaMaster?id='+idCampaign)
  }

  putEnemyHitPoints(hP:number, idEn:number, idCam:string){
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: { hitPoints: hP,
              idEnemy: idEn,
              idCampaign: idCam},
    };
    return this.http.put(this.url+"/vistaMaster/enemy", options)
  }

  putPlayerHitPoints(hP:number, idPl:number, idCam:string){
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: { hitPoints: hP,
              idEnemy: idPl,
              idCampaign: idCam},
    };
    return this.http.put(this.url+"/vistaMaster/player", options)
  }
}
