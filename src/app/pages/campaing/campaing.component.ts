import { Component, OnInit } from '@angular/core';
import { Campaing } from '../../models/campaing';
import { CampaingService } from '../../shared/campaing.service';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/shared/character.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-campaing',
  templateUrl: './campaing.component.html',
  styleUrls: ['./campaing.component.css'],
})
export class CampaingComponent implements OnInit {

  public delayKeyUp: any; // para controlar el temporizador de pulsaciones al filtrar
  public campaignsIds:string[]
  public allCampaigns: Campaing[];
  public allCampaignsFiltered: Campaing[];
  public selectedCampaign: Campaing;

  constructor(private campaignService: CampaingService, private router: Router, public characterService:CharacterService,public userService:UserService) {
    this.getAllCampaigns();
    this.campaignsIds =[]
    this.userService.getCampaignMaster(this.userService.user.idUser).subscribe((data:any)=>{
      for(let id of data.resultado){
        this.campaignsIds.push(id.idCampaign)
      }
    })
    this.userService.getCampaignPlayer().subscribe((data:any)=>{
      for(let id of data.resultado){
        this.campaignsIds.push(id.idCampaign)
      }
      console.log(this.campaignsIds)
    })
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
    console.log(campaign)
    this.selectedCampaign = campaign;
  
  }
  
  validarCodigoUnirse(idCampaign: string, idError: any) {
    this.campaignService.getCampaignById(idCampaign)
    .subscribe((resp: any) => {
      if (resp.ok) {
        this.campaignService.actualCampaign = resp.resultado[0];
        const { closed, numPlayer, maxPlayer} = resp.resultado[0]
        if ( resp.resultado[0].public == 0 && closed == 0 && numPlayer < maxPlayer){
          this.router.navigate(['/characterList'])
        } else {
          idError.style.visibility = 'visible'
          idError.setAttribute('value', '');
        }
      } else {
        idError.style.visibility = 'visible'
        idError.setAttribute('value', '');
      }
    })
  }

  quitarError(idError: any) {
    idError.style.visibility = 'hidden'
  }

  joinCampaign() {
    this.campaignService.idCampaign = this.selectedCampaign.idCampaign; //Quitar tras refactorizar todo a actualCampaign del servicio
    this.campaignService.actualCampaign = this.selectedCampaign; 
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
