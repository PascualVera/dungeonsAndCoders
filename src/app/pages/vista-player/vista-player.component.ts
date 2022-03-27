import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../shared/web-socket.service';
import { CampaingService } from '../../shared/campaing.service';
import { PlayersService } from 'src/app/shared/players.service';

@Component({
  selector: 'app-vista-player',
  templateUrl: './vista-player.component.html',
  styleUrls: ['./vista-player.component.css']
})
export class VistaPlayerComponent implements OnInit {

  constructor(private wss: WebSocketService, private campaignService: CampaingService, private playersService: PlayersService) { 
    this.playersService.players = [];
    this.playersService.master.name = '';
    this.playersService.inGamePlayer(this.campaignService.actualCampaign.idCampaign)
    .subscribe((resp: any) => {
      resp.resultado.forEach((item: any) => {
        this.playersService.players.push({ name: item.name, escribiendo: false})
      })
    })
    this.campaignService.getCampaignById(this.campaignService.actualCampaign.idCampaign)
    .subscribe((resp: any) => {
      this.playersService.master.name = resp.resultado[0].name
    })
  }

  ngOnInit(): void {
  }
}
