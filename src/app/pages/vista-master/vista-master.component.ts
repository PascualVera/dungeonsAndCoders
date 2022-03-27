import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Character } from 'src/app/models/character';
import { Enemy } from 'src/app/models/enemy';
import { EnemyHitPoints } from 'src/app/models/enemy-hit-points';
import { Player } from 'src/app/models/player';
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
  public spellCharacter: Spell [];
  public equipCharacter: Weapon [];
  public characterCampaign: Character [];
  public hitPointsEnemy: EnemyHitPoints [];
  public hitPointsPlayer: Player [];
  @ViewChild('enemy') enemy: ElementRef;
  @ViewChild('player') player: ElementRef;
  @ViewChild('calc') calc: ElementRef;
  public index: number = 0;
  public index2: number = 0;
  public idEnemy: number;
  public idCharacter: number;
  public idCampaignPre: number;
  public idCampaignActual: string;
  constructor(public campaingService:CampaingService, public characterService:CharacterService, public master: MasterService) { 
    
    this.idCampaignPre = this.campaingService.actualCampaign.idCampaignPre
    this.idCampaignActual = this.campaingService.actualCampaign.idCampaign

    this.enemiesCampaign(this.idCampaignPre)
    this.enemyHitPoints(this.idCampaignActual)

    console.log(this.hitPointsEnemy)
    
    this.characterService.getCharactersInGame(this.idCampaignActual).subscribe((data:any)=>{
      this.characterCampaign = data.respuesta;
      console.log(this.characterCampaign)
    })
    
  }

  ngOnInit(): void {
  }

  enemiesCampaign(idCampignPre:number):any{
    this.master.getAllEnemy(idCampignPre).subscribe((data:any) =>{
      this.enemyCampaignPre = data.resultado;
    })
  }
//Conjuros y Equipo de los enemigos
  enemySpell(idEnemyPre:number):any{
    this.master.getAllSpell(idEnemyPre).subscribe((data:any) =>{
      this.spellEnemy = data.resultado;
    })
  }

  enemyEquip(idEnemyPre:number):any{
    this.master.getAllEquip(idEnemyPre).subscribe((data:any) =>{
      this.equipEnemy = data.resultado;
    })
  }

//Conjuros y equipo Personajes

  characterSpell(idCharacter:number):any{
    this.characterService.getSpell(idCharacter).subscribe((data:any) =>{
      this.spellCharacter = data.resultado;
    })
  }

  characterEquip(idCharacter:number):any{
    this.characterService.getWeapon(idCharacter).subscribe((data:any) =>{
      this.equipCharacter = data.resultado;
    })
  }

///HitPoints Enemigos

enemyHitPoints(idCampaign:string){
  this.master.getEnemyHitPoints(idCampaign).subscribe((data:any) =>{
    this.hitPointsEnemy = data.resultado;
  })
}

playerHitPoints(idCampaign: string){
  this.master.getPlayerHitPoints(idCampaign).subscribe((data:any) =>{
    this.hitPointsPlayer = data.resultado;
  })
}

  modalEnemigos(modalEnemigos: HTMLElement, visible: boolean) {
    modalEnemigos.style.display = (visible) ? 'flex' : 'none';
    this.index = this.enemy.nativeElement.value;
    this.idEnemy = this.enemyCampaignPre[this.index].idEnemyPre;
    this.enemySpell(this.idEnemy);
    this.enemyEquip(this.idEnemy);
    console.log(this.calc.nativeElement.value)
  }

  modalPersonaje(modalPersonaje: HTMLElement, visible: boolean) {
    modalPersonaje.style.display = (visible) ? 'flex' : 'none';
    this.index2 = this.player.nativeElement.value;
    this.idCharacter = this.characterCampaign[this.index2].idCharacter
    this.characterSpell(this.idCharacter);
    this.characterEquip(this.idCharacter);
    console.log(this.player.nativeElement.value)
  }
}
