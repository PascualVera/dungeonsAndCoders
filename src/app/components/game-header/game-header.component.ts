import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersService } from 'src/app/shared/players.service';
import { CampaingService } from '../../shared/campaing.service';
import { UserService } from '../../shared/user.service';
import { WebSocketService } from '../../shared/web-socket.service';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css']
})
export class GameHeaderComponent implements OnInit {

  constructor(public router:Router,
              private ps: PlayersService,
              private userService: UserService,
              private wss: WebSocketService,
              public campaignService: CampaingService,
              ) { 

    //Hardcoreado
    // this.campaignService.actualCampaign.idCampaign = 'XLAWPJ1Q',
    // this.campaignService.actualCampaign.closed = 0;
    // this.campaignService.actualCampaign.numPlayer = 2;
    // this.ps.master.name = 'ajurado301'
  }

  ngOnInit(): void {
  }

  modal(veloModal: HTMLElement, visible: boolean) {
    veloModal.style.display = (visible) ? 'flex' : 'none';    
  }
  copyCode(confirm:HTMLElement){
    confirm.innerHTML = 'Copiado'
    navigator.clipboard.writeText(this.campaignService.actualCampaign.idCampaign)
    setTimeout(()=>{
      confirm.innerHTML = 'Copiar Código'
    },1000)
  }

  startCampaign(veloModal: HTMLElement) {
    this.campaignService.getCampaignById(this.campaignService.actualCampaign.idCampaign)
      .subscribe((resp: any) =>{
        this.campaignService.actualCampaign.playerMin = resp.resultado[0].playerMin;
        this.campaignService.actualCampaign.numPlayer = resp.resultado[0].numPlayer;
        if (resp.resultado[0].numPlayer >= resp.resultado[0].playerMin){
          let campaign = {
            closed: 1,
            idCampaign: this.campaignService.actualCampaign.idCampaign
          }
          this.campaignService.putCampaing(campaign)
            .subscribe(() =>{
              this.campaignService.actualCampaign.closed = 1;
            })
        } else {
          this.modal(veloModal, true);
        }
      })
  }

  endCampaign() {
    this.campaignService.deleteCampaign(this.campaignService.actualCampaign.idCampaign)
    .subscribe((resp: any)=>{
      if (resp.ok) {
        this.wss.emite('send-finalizar', { campaignCode: this.campaignService.actualCampaign.idCampaign });
        this.router.navigate(['/perfil'])
      }
    })
  }

  leaveCampaign() {
    this.campaignService.getCampaignById(this.campaignService.actualCampaign.idCampaign)
      .subscribe((resp: any) => {
        if (resp.ok) {
          let numPlayer = { numPlayer: resp.resultado[0].numPlayer - 1, idCampaign: this.campaignService.actualCampaign.idCampaign }
          this.campaignService.putCampaing(numPlayer).subscribe(() => { 
          })
          this.ps.deletePlayer(this.userService.user.idUser, this.campaignService.actualCampaign.idCampaign)
            .subscribe(() => {
              let masmenosPlayer = {
                campaignCode: this.campaignService.actualCampaign.idCampaign,
                player: this.userService.user.name,
                viene: false
              }
              this.wss.emite('send-masmenosplayer', masmenosPlayer);
              this.router.navigate(['/perfil'])
             });
        }
      })
  }

}
