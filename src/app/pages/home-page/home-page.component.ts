import { Component, OnInit } from '@angular/core';
import { CampaignHome } from '../../models/campaign-home';
import { CampaignHomeService } from '../../shared/campaign-home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public letrero: string = "assets/images/letrero.png"
  public partidas: CampaignHome[];
  
  constructor(private chs: CampaignHomeService) { 
    this.mostarPartidas();
  }
 
  ngOnInit(): void {
  }
  
  ///Mostrar las 5 ultimas partidas
  mostarPartidas() {
    this.chs.getLastCampaigns().subscribe((resp: any) => 
    {    
      this.partidas = resp.resultado
    })
  }
}