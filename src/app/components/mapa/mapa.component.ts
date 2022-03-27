import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaingService } from 'src/app/shared/campaing.service';
import { WebSocketService } from 'src/app/shared/web-socket.service';
import { CampaignMapService } from '../../shared/campaign-map.service';
import { CampaignMap } from '../../models/campaign-map';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor(public campaingService:CampaingService,
              public router: Router,
              public campaignMapService: CampaignMapService,
              private wss: WebSocketService) {

  this.campaignMapService.getMaps(campaingService.actualCampaign.idCampaignPre)
  .subscribe((resp: any) => {
    if (resp.resultado.length > 0) {
      this.campaignMapService.campaignMaps = resp.resultado;
      this.campaignMapService.activeMap = resp.resultado[0]
    }
  })
} 
  
   ngOnInit(): void {
    this.wss.escucha('new-map').subscribe((data: any) => {
      const { campaignCode, activeMap } = data;
      if (campaignCode == this.campaingService.actualCampaign.idCampaign) {
        this.campaignMapService.activeMap = activeMap;
      }
    })
  }
  
  changeImg(map: CampaignMap){
    this.campaignMapService.activeMap = map;
    let activeMap = {
      campaignCode: this.campaingService.actualCampaign.idCampaign,
      activeMap: map
    }
    this.wss.emite('send-map', activeMap);
  }
}
