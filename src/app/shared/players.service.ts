import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  public master: any;
  public system: string;
  public players: any[];
  public playerColors: string[];
  private url:string
  public player:Player
  constructor(private http:HttpClient) {
    this.master = { name: '', escribiendo: false };
    this.system = '[System]';

     this.url = 'https://dungeons-and-coders-api.herokuapp.com'
    // this.url = 'http://localhost:4000'
    this.players = [];
    this.playerColors = ['#e7623e', '#7f513e', '#2a50a1', '#507f62', '#208820', '#555752'];
  }

  setEscribiendo(player: string, estado: boolean) {
    if (player == this.master.name) {
      this.master.escribiendo = estado;
    } else  {
      let indice = this.players.findIndex((item) => item.name == player);     
      if (indice > -1) {
        this.players[indice].escribiendo = estado;
      }
    }
  }
  createPlayers(player:any) {
    return this.http.post(this.url + '/player', player)
  }
  inGamePlayer(idCampaign:string){
    return this.http.get(this.url + `/player?id=${idCampaign}` )
  }
  initPlayers(){
    this.players = [{name:'System' , escribiendo: false}];

  }
}
