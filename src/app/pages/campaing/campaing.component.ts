import { Component, OnInit } from '@angular/core';
import { Campaing } from '../../models/campaing';
import { CampaingService } from '../../shared/campaing.service';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/shared/character.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-campaing',
  templateUrl: './campaing.component.html',
  styleUrls: ['./campaing.component.css'],
})
export class CampaingComponent implements OnInit {

  public allCampaigns: Campaing[];
  public selectedCampaign: string;

  constructor(private campaignService: CampaingService, private router: Router, public characterService:CharacterService) {
    this.getAllCampaigns();
  }

  openModal(modal: any) {
    modal.style.display = 'flex';
  }
  closeModal(modal: any) {
    modal.style.display = 'none';
  }
  ngOnInit(): void {}

  // De aquí para abajo hecho por Ander
  getAllCampaigns() {
    this.campaignService.getAllCampaigns().subscribe((resp: any) => 
    { 
      this.allCampaigns = resp.resultado
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
    this.characterService.getCharactersInGame(this.campaignService.idCampaign).subscribe((data:any)=>{
      this.characterService.charactersInGame = []
      for(const id of data.respuesta){
        this.characterService.charactersInGame.push(id.idCharacter)
      }
      console.log(this.characterService.charactersInGame)
      this.router.navigate(['/characterList'])
      
    })
    
  }
}
