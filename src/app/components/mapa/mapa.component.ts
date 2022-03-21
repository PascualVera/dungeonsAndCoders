import { Component, OnInit } from '@angular/core';
import { CampaingService } from 'src/app/shared/campaing.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  public maps:any[]
  constructor(public campaingService:CampaingService) {
    this.maps = campaingService.campaing.maps
   }
  
  test(){
    console.log(this.campaingService.campaing.maps[0])
  }
  changeImg(screenMap:any, img: any){
    screenMap.src = img

  }
  ngOnInit(): void {
  }

}
