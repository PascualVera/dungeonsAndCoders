import { Component, OnInit } from '@angular/core';
import { CampaingService } from 'src/app/shared/campaing.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public letrero: string = "assets/images/letrero.png"
  public partida: string[] = [];
  constructor(private campaignService: CampaingService) { }

  ///Mostrar las 5 ultimas partidas
  mostarPartidas()
  {
    this.campaignService.getCampaign().subscribe((dato: any) => 
    {
      this.partida = dato;
      console.log(dato);
    })
  }

  ngOnInit(): void {
  }

}