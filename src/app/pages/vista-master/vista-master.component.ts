import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Enemy } from 'src/app/models/enemy';
import { CampaingService } from 'src/app/shared/campaing.service';
import { CharacterService } from 'src/app/shared/character.service';
import { MasterService } from 'src/app/shared/master.service';


@Component({
  selector: 'app-vista-master',
  templateUrl: './vista-master.component.html',
  styleUrls: ['./vista-master.component.css']
})
export class VistaMasterComponent implements OnInit {
  public enemyCampaignPre: Enemy [];
  @ViewChild('enemy') enemy: ElementRef;
  public index: number = 0;
  constructor(public campaingService:CampaingService, public characterService:CharacterService, public masterEnemies: MasterService) { 
    this.enemiesCampaign(1)
  }

  ngOnInit(): void {
  }

  enemiesCampaign(idCampignPre:number){
    this.masterEnemies.getAllEnemy(idCampignPre).subscribe((data:any) =>{
      this.enemyCampaignPre = data.resultado;
      console.log(data.resultado)
    })
    
  }

  modalEnemigos(modalEnemigos: HTMLElement, visible: boolean) {
    modalEnemigos.style.display = (visible) ? 'flex' : 'none';
    this.index = this.enemy.nativeElement.value
  }

  modalPersonaje(modalPersonaje: HTMLElement, visible: boolean) {
    modalPersonaje.style.display = (visible) ? 'flex' : 'none';
  }
}
