import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaingService } from 'src/app/shared/campaing.service';
import { WebSocketService } from 'src/app/shared/web-socket.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  
  constructor(public campaingService:CampaingService,public router: Router, private wss: WebSocketService) {
    
   }
  
  
  changeImg(map: any){
    this.campaingService.activeMap = map;
    let activeMap = {
      campaingCode: this.campaingService.campaingCode,
      activeMap: map
    } 
    this.wss.emite('send-map', activeMap);
  }
  ngOnInit(): void {
  }

}
