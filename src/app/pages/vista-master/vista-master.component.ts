import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Character } from 'src/app/models/character';
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
  public spellCharacter: Spell [];
  public equipCharacter: Weapon [];
  public characterCampaign: Character []
  @ViewChild('enemy') enemy: ElementRef;
  @ViewChild('player') player: ElementRef;
  public index: number = 0;
  public index2: number = 0;
  public idEnemy: number;
  public idCharacter: number;
  public idCampaignPre: number;
  public idCampaignActual: string;
  constructor(public campaingService:CampaingService, public characterService:CharacterService, public masterEnemies: MasterService) { 
    
    this.idCampaignPre = this.campaingService.actualCampaign.idCampaignPre

    this.enemiesCampaign(2)
    // this.characterPlaying('asdfg123')
    this.characterService.getCharactersInGame('asdfg123').subscribe((data:any)=>{
      // this.characterService.charactersInGame = []
      // for(const id of data.respuesta){
      //   this.characterService.charactersInGame.push(id)
      // }
      this.characterCampaign = data.respuesta;
      console.log(this.characterCampaign)
    })
    
  }

  ngOnInit(): void {
  }

  enemiesCampaign(idCampignPre:number):any{
    this.masterEnemies.getAllEnemy(idCampignPre).subscribe((data:any) =>{
      this.enemyCampaignPre = data.resultado;
    })
  }
//Conjuros y Equipo de los enemigos
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
  modalEnemigos(modalEnemigos: HTMLElement, visible: boolean) {
    modalEnemigos.style.display = (visible) ? 'flex' : 'none';
    this.index = this.enemy.nativeElement.value;
    this.idEnemy = this.enemyCampaignPre[this.index].idEnemyPre;
    this.enemySpell(this.idEnemy);
    this.enemyEquip(this.idEnemy);
    console.log(this.enemy.nativeElement.value)
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
