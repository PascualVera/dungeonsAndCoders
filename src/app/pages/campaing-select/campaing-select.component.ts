import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignPreService } from '../../shared/campaign-pre.service';
import { CampaignPre } from '../../models/campaign-pre';
import { Campaing } from 'src/app/models/campaing';
import { CampaingService } from '../../shared/campaing.service';
import { UserService } from '../../shared/user.service';
import { PlayersService } from 'src/app/shared/players.service';

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

  constructor(private campaignPreService: CampaignPreService,
              private campaignService: CampaingService,
              private userService: UserService,
              private playersService: PlayersService,
              private router: Router) {
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

  selectCampaignPre(campaignPre: CampaignPre) {
    this.selectedCampaignPre = campaignPre;
    this.rangoJugadores = [];
    for (let i = this.selectedCampaignPre.playerMin; i <= this.selectedCampaignPre.playerMax; i++) {
      this.rangoJugadores.push(i);
    }
  }

  crearCampaign(checkPublica: boolean, inputNombre: string, selectPlayers: string, error: HTMLSpanElement) {
    if (!inputNombre || !selectPlayers) {
      error.style.visibility = 'visible'
    } else {
      
      let idAleatorio: string;
      let charAleatorio: number;
      let idLibre: boolean = false;

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
        
        this.campaignService.getCampaignById(idAleatorio)
        .subscribe((resp: any) => {
          if (!resp.ok) {
            idLibre = true;
          }
        })
      } while (idLibre);
      
      this.campaignService.idCampaign = idAleatorio; // TODO: quitar tras refactorizar

      this.campaignService.actualCampaign.idCampaign = idAleatorio;
      this.campaignService.actualCampaign.campaignName = inputNombre;
      this.campaignService.actualCampaign.idCampaignPre = this.selectedCampaignPre.idCampaignPre;
      this.campaignService.actualCampaign.idMaster = this.userService.user.idUser;
      this.campaignService.actualCampaign.date = new Date();
      this.campaignService.actualCampaign.numPlayer = 0;
      this.campaignService.actualCampaign.maxPlayer = parseInt(selectPlayers);
      this.campaignService.actualCampaign.playerMin = this.selectedCampaignPre.playerMin;
      (checkPublica) ? this.campaignService.actualCampaign.public = 1 : this.campaignService.actualCampaign.public = 0;
      this.campaignService.actualCampaign.closed = 0;

      this.playersService.master.name = this.userService.user.name;

      this.campaignService.postCampaign(this.campaignService.actualCampaign)
      .subscribe(() => {})

      this.router.navigate(['/master'])
    }
  }
}
