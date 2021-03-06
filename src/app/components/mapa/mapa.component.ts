import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CampaingService } from 'src/app/shared/campaing.service';
import { WebSocketService } from 'src/app/shared/web-socket.service';
import { CampaignMapService } from '../../shared/campaign-map.service';
import { CampaignMap } from '../../models/campaign-map';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, OnDestroy {

  private escuchaMap : Subscription;

  constructor(public campaingService:CampaingService,
              public router: Router,
              public campaignMapService: CampaignMapService,
              private wss: WebSocketService) {
  this.campaignMapService.getMaps(this.campaingService.actualCampaign.idCampaignPre)
  .subscribe((resp: any) => {
    if (resp.resultado.length > 0) {
      this.campaignMapService.campaignMaps = resp.resultado;
      this.campaignMapService.activeMap = resp.resultado[0]
    }
  })
} 
  
   ngOnInit(): void {
    this.escuchaMap = this.wss.escucha('new-map').subscribe((data: any) => {
      const { campaignCode, activeMap } = data;
      if (campaignCode == this.campaingService.actualCampaign.idCampaign) {
        this.campaignMapService.activeMap = activeMap;
      }
    })
  }

  ngOnDestroy(): void {
    this.escuchaMap.unsubscribe();
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
