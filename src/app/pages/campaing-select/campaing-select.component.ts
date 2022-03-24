import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignPreService } from '../../shared/campaign-pre.service';
import { CampaignPre } from '../../models/campaign-pre';
import { Campaing } from 'src/app/models/campaing';

@Component({
  selector: 'app-campaing-select',
  templateUrl: './campaing-select.component.html',
  styleUrls: ['./campaing-select.component.css']
})
export class CampaingSelectComponent implements OnInit {

  public campaignToCreate: Campaing;
  public allCampaignsPre: CampaignPre[];
  public selectedCampaignPre: CampaignPre;
  public rangoJugadores: number[];

  constructor(private campaignPreService: CampaignPreService, private router: Router) {
    this.selectedCampaignPre = new CampaignPre();
    this.getAllCampaigns()
  }

  ngOnInit(): void {
  }

  // para abrir modal
  modalCrear(veloModalCrear: HTMLElement, visible: boolean, inputNombre?: HTMLInputElement, selectPlayers?: HTMLSelectElement) {
    veloModalCrear.style.display = (visible) ? 'flex' : 'none';
    if (inputNombre) {
      inputNombre.value = '';
    }
    if (selectPlayers) {
      selectPlayers.value = '';
    }
  }

  // **********************************
  // De aquí para abajo hecho por Ander
  // **********************************
  getAllCampaigns() {
    this.campaignPreService.getAllCampaigns().subscribe((resp: any) => {
      this.allCampaignsPre = resp.resultado;
    })
  }

  selectCampaignPre(campaignPre: CampaignPre, resumenCuerpo: HTMLElement) {
    this.selectedCampaignPre = campaignPre;
    this.rangoJugadores = [];
    for (let i = this.selectedCampaignPre.playerMin; i <= this.selectedCampaignPre.playerMax; i++) {
      this.rangoJugadores.push(i);
    }
  }

  crearCampaign(checkTipo: string, inputNombre: string, selectPlayers: string, error: HTMLSpanElement) {
    if (!inputNombre || !selectPlayers) {
      error.style.visibility = 'visible'
    } else {
      this.campaignToCreate = new Campaing();
      
      let idAleatorio: string;
      let charAleatorio: number;
      
      do {
        idAleatorio = '';  
        while (idAleatorio.length < 8) {
          charAleatorio = Math.round(Math.random() * 74 + 48);
          if ((charAleatorio >= 48 && charAleatorio <= 57) ||
            (charAleatorio >= 65 && charAleatorio <= 90) ||
            (charAleatorio >= 97 && charAleatorio <= 122))
          {
            idAleatorio += String.fromCharCode(charAleatorio);
          }
        }
        
      } while (false);

      // TODO: Como comprobar que no exista
      console.log(idAleatorio);

      // idCampaign
      // campaignName
      // idCampaignPre
      // idMaster
      // date
      // numPlayer
      // maxPlayer
      // public
      // closed

      // this.router.navigate(['/master'])
    }
  }
}
