import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  public player: string;
  public players: string[];
  public playerColors: string[];

  constructor() {
    this.players = ['[System]', 'player1', 'player2', 'player3', 'player4', 'player5', 'player6']
    this.player = '';
    this.playerColors = ['#8b0000', '#e7623e', '#7f513e', '#2a50a1', '#507f62', '#91a1b2', '#555752'];
   }

   // TODO: provisional los players se cargaran desde bbdd
   public setPlayer(player: string) {
     // Lo hacemos provisional solo si esta en la lista provisional de players
     if(this.players.includes(player)) {
       this.player = player
     };
   }
}
