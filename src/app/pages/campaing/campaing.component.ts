import { Component, OnInit, OnDestroy } from '@angular/core';
import { Campaing } from '../../models/campaing';
import { CampaingService } from '../../shared/campaing.service';
import { Router } from '@angular/router';
import { CharacterService } from 'src/app/shared/character.service';
import { UserService } from 'src/app/shared/user.service';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../shared/web-socket.service';

@Component({
  selector: 'app-campaing',
  templateUrl: './campaing.component.html',
  styleUrls: ['./campaing.component.css'],
})
export class CampaingComponent implements OnInit, OnDestroy {

  public delayKeyUp: any; // para controlar el temporizador de pulsaciones al filtrar
  public campaignsIds:string[]
  public allCampaigns: Campaing[];
  public allCampaignsFiltered: Campaing[];
  private filtroActual: string = '';
  public selectedCampaign: Campaing;
  public eschuchaMasmenosPlayer: Subscription;
  private escuchaFinalizar: Subscription;
  private escuchaPlaying: Subscription;

  constructor(private campaignService: CampaingService,
              private router: Router,
              public characterService:CharacterService,
              private wss: WebSocketService,
              public userService:UserService) {
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
      this.getAllCampaigns();
    })
  }
  
  ngOnInit(): void {
    this.eschuchaMasmenosPlayer = this.wss.escucha('new-masmenosplayer').subscribe((data: any) => {
      this.getAllCampaigns();
      this.filtrar(this.filtroActual);
    });
    this.escuchaFinalizar = this.wss.escucha('new-finalizar').subscribe((data: any) => {
      this.getAllCampaigns();
      this.filtrar(this.filtroActual);
    });
    // Emitido con undefined cuando se crea una partida con la intención de actualizar lista de campañas
    this.escuchaPlaying = this.wss.escucha('new-playing').subscribe((data: any) => {
      if (!data.campaignCode) {
        this.getAllCampaigns();
        this.filtrar(this.filtroActual);
      }
    });
  }

  ngOnDestroy(): void {
    this.eschuchaMasmenosPlayer.unsubscribe()
    this.escuchaFinalizar.unsubscribe()
    this.escuchaPlaying.unsubscribe()
  }

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
    };
    this.filtroActual = filtro;
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
