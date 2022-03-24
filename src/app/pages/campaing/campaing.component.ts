import { Component, OnInit } from '@angular/core';
import { Campaing } from '../../models/campaing';
import { CampaingService } from '../../shared/campaing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaing',
  templateUrl: './campaing.component.html',
  styleUrls: ['./campaing.component.css'],
})
export class CampaingComponent implements OnInit {

  public delayKeyUp: any; // para controlar el temporizador de pulsaciones al filtrar

  public allCampaigns: Campaing[];
  public allCampaignsFiltered: Campaing[];
  public selectedCampaign: string;

  constructor(private campaignService: CampaingService, private router: Router) {
    this.getAllCampaigns();
  }
  
  ngOnInit(): void {}

  openModal(modal: any) {
    modal.style.display = 'flex';
  }
  closeModal(modal: any) {
    modal.style.display = 'none';
  }

  // **********************************
  // De aquí para abajo hecho por Ander
  // **********************************
  getAllCampaigns() {
    this.campaignService.getAllCampaigns().subscribe((resp: any) => 
    { 
      this.allCampaigns = resp.resultado;
      this.allCampaignsFiltered = this.allCampaigns;
    })
  }

  selectCampaign(campaign: Campaing) {
    this.selectedCampaign = campaign.idCampaign;
  }
  
  validarCodigoUnirse(idCampaign: string, idError: any) {
    let indice: number = 0;
    let encontrado: boolean = false;
    while (indice < this.allCampaigns.length && !encontrado) {
      if (this.allCampaigns[indice].idCampaign == idCampaign && !this.allCampaigns[indice].public) {
        encontrado = true
      } else {
        indice++
      }
    }
    if (encontrado) {
      this.selectedCampaign = this.allCampaigns[indice].idCampaign;
      this.joinCampaign();
    }else {
      idError.style.visibility = 'visible'
      idError.setAttribute('value', '');
    }
  }

  quitarError(idError: any) {
    idError.style.visibility = 'hidden'
  }

  joinCampaign() {
    this.campaignService.idCampaign = this.selectedCampaign;
    this.router.navigate(['/characterList'])
  }

  filtrar(filtro: string) {
    if (this.delayKeyUp) {
      clearTimeout(this.delayKeyUp)
    }
    this.delayKeyUp = setTimeout(() => {
        if (!filtro) {
          this.allCampaignsFiltered = this.allCampaigns;
        } else {
          this.allCampaignsFiltered = this.allCampaigns.filter((campaign) => {
            return campaign.campaignName.toLowerCase().startsWith(filtro.toLowerCase())
          })
        }
    }, 300);
  }
}
