import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../../shared/web-socket.service';
import { CampaingService } from '../../shared/campaing.service';
import { PlayersService } from 'src/app/shared/players.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vista-player',
  templateUrl: './vista-player.component.html',
  styleUrls: ['./vista-player.component.css']
})
export class VistaPlayerComponent implements OnInit, OnDestroy {

  private escuchaFinalizar: Subscription;

  constructor(private wss: WebSocketService,
              private campaignService: CampaingService,
              private router: Router,
              private playersService: PlayersService) { 
    this.playersService.master.name = '';
    this.playersService.inGamePlayer(this.campaignService.actualCampaign.idCampaign)
    .subscribe((resp: any) => {
      this.playersService.players = [];
      resp.resultado.forEach((item: any) => {
        this.playersService.players.push({ name: item.name, escribiendo: false, playing: false})
      })
    })
    this.campaignService.getCampaignById(this.campaignService.actualCampaign.idCampaign)
    .subscribe((resp: any) => {
      this.playersService.master.name = resp.resultado[0].name
    })
  }

  ngOnInit(): void {
    this.escuchaFinalizar = this.wss.escucha('new-finalizar').subscribe((data: any) => {
      const { campaignCode } = data;
      if (campaignCode == this.campaignService.actualCampaign.idCampaign) {
        this.router.navigate(['/perfil'])
      }
    }) 
  }

  ngOnDestroy(): void {
    this.escuchaFinalizar.unsubscribe();
  }
}
