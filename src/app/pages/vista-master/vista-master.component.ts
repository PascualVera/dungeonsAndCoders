import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Enemy } from 'src/app/models/enemy';
import { Spell } from 'src/app/models/spell';
import { Weapon } from 'src/app/models/weapon';
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
  public spellEnemy: Spell [];
  public equipEnemy: Weapon [];
  @ViewChild('enemy') enemy: ElementRef;
  public index: number = 0;
  public idEnemy: number;
  constructor(public campaingService:CampaingService, public characterService:CharacterService, public masterEnemies: MasterService) { 
    this.enemiesCampaign(2)
  }

  ngOnInit(): void {
  }

  enemiesCampaign(idCampignPre:number):any{
    this.masterEnemies.getAllEnemy(idCampignPre).subscribe((data:any) =>{
      this.enemyCampaignPre = data.resultado;
      console.log(data.resultado)
    })
  }

  enemySpell(idEnemyPre:number):any{
    this.masterEnemies.getAllSpell(idEnemyPre).subscribe((data:any) =>{
      this.spellEnemy = data.resultado;
    })
  }

  enemyEquip(idEnemyPre:number):any{
    this.masterEnemies.getAllEquip(idEnemyPre).subscribe((data:any) =>{
      this.equipEnemy = data.resultado;
    })
  }

  modalEnemigos(modalEnemigos: HTMLElement, visible: boolean) {
    modalEnemigos.style.display = (visible) ? 'flex' : 'none';
    this.index = this.enemy.nativeElement.value;
    this.idEnemy = this.enemyCampaignPre[this.index].idEnemyPre;
    this.enemySpell(this.idEnemy);
    this.enemyEquip(this.idEnemy)
    console.log(this.equipEnemy)
  }

  modalPersonaje(modalPersonaje: HTMLElement, visible: boolean) {
    modalPersonaje.style.display = (visible) ? 'flex' : 'none';
  }
}
