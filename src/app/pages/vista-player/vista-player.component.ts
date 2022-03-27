import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../shared/web-socket.service';
import { CampaingService } from '../../shared/campaing.service';

@Component({
  selector: 'app-vista-player',
  templateUrl: './vista-player.component.html',
  styleUrls: ['./vista-player.component.css']
})
export class VistaPlayerComponent implements OnInit {

  constructor(private wss: WebSocketService, private cs: CampaingService) { }

  ngOnInit(): void {
  }
}
