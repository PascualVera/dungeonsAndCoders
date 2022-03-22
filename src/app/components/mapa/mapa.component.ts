import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaingService } from 'src/app/shared/campaing.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  
  constructor(public campaingService:CampaingService,public router: Router) {
    
   }
  
  
  changeImg(img: any){
    this.campaingService.activeMap = img

  }
  ngOnInit(): void {
  }

}
