import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  public players: any[];
  public playerColors: string[];
  private url:string
  public player:Player
  constructor(private http:HttpClient) {
    // this.url = 'https://dungeons-and-coders-api.herokuapp.com'
    this.url = 'http://localhost:4000'
    this.players = [
      { name: '[System]', escribiendo: false },
      { name: 'player1', escribiendo: false },
      { name: 'player2', escribiendo: false },
      { name: 'player3', escribiendo: false },
      { name: 'player4', escribiendo: false },
      { name: 'player5', escribiendo: false },
      { name: 'player6', escribiendo: false },
    ];
    this.playerColors = ['#8b0000', '#e7623e', '#7f513e', '#2a50a1', '#507f62', '#91a1b2', '#555752'];
  }

  setEscribiendo(campaignCode: string, player: string, estado: boolean) {
    let indice: number = 1;
    let encontrado: boolean = false;
    while (indice < this.players.length && !encontrado) {
      if (this.players[indice].name == player) {
        encontrado = true;
      } else {
        indice++;
      }
    }
    if (indice > -1) {
      this.players[indice].escribiendo = estado;
    }
  }
  createPlayers(player:any) {
    return this.http.post(this.url + '/player', player)
  }
}
