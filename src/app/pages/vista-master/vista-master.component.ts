import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Character } from 'src/app/models/character';
import { Enemy } from 'src/app/models/enemy';
import { EnemyHitPoints } from 'src/app/models/enemy-hit-points';
import { Spell } from 'src/app/models/spell';
import { Weapon } from 'src/app/models/weapon';
import { CampaingService } from 'src/app/shared/campaing.service';
import { CharacterService } from 'src/app/shared/character.service';
import { MasterService } from 'src/app/shared/master.service';
import { PlayersService } from 'src/app/shared/players.service';
import { CampaignMapService } from 'src/app/shared/campaign-map.service';


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
  public hitPointsPlayer: any [];
  public maps: any [];
  @ViewChild('enemy') enemy: ElementRef;
  @ViewChild('player') player: ElementRef;
  @ViewChild('calc') calc: ElementRef;
  public index: number = 0;
  public index2: number = 0;
  public indexCalc: number = 0;
  public idEnemy: number;
  public idCharacter: number;
  public idCampaignPre: number;
  public idCampaignActual: string;
  public campaignTitle: string;
  constructor(public campaingService:CampaingService, public characterService:CharacterService, public master: MasterService, public playersService: PlayersService, public mapService: CampaignMapService) { 
    
    this.idCampaignPre = this.campaingService.actualCampaign.idCampaignPre;
    this.idCampaignActual = this.campaingService.actualCampaign.idCampaign;
    this.campaignTitle = this.campaingService.actualCampaign.campaignNamePre;
    this.mapService.getMaps(this.idCampaignPre).subscribe((data:any) =>{
      this.maps = data;
    })
    this.characterCampaign = [new Character ()]
    this.enemyCampaignPre = [new Enemy ()]
    this.enemiesCampaign(this.idCampaignPre)
    this.playerInGame(this.idCampaignActual)
    this.playerHitPoints(this.idCampaignActual)
    this.enemyHitPoints(this.idCampaignActual)
    this.playersService.players = [0];
    this.playersService.master.name = '';
    this.playersService.inGamePlayer(this.campaingService.actualCampaign.idCampaign)
    .subscribe((resp: any) => {
      this.playersService.players = [];
      resp.resultado.forEach((item: any) => {
        this.playersService.players.push({ name: item.name, escribiendo: false, playing: false})
      })
    })
    this.campaingService.getCampaignById(this.campaingService.actualCampaign.idCampaign)
    .subscribe((resp: any) => {
      this.playersService.master.name = resp.resultado[0].name
    })
        
  }

  ngOnInit(): void {
  }


///Player nad Enemy in game

  playerInGame(idCampaign:string){
    this.characterService.getCharactersInGame(idCampaign).subscribe((data:any)=>{
      this.characterCampaign = data.respuesta;
    })
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

///GetHitPoints Enemigy and Player

enemyHitPoints(idCampaign:string){
  this.master.getEnemyHitPoints(idCampaign).subscribe((data:any) =>{
    this.hitPointsEnemy = data.resultado;
    for(let i=0; i<this.hitPointsEnemy.length; i++)
    {
      this.master.hitPoints.push({idEnemy: this.hitPointsEnemy[i].idEnemy,idPlayer: 0, name: this.hitPointsEnemy[i].name, hitPoints: this.hitPointsEnemy[i].hitPoints})
    }
  })
}

playerHitPoints(idCampaign: string){
  this.playersService.inGamePlayer(idCampaign).subscribe((data:any) =>{
    this.hitPointsPlayer = data.resultado;
    this.master.characterPlayer = [];
    this.master.hitPoints = []
    for(let i=0; i<this.hitPointsPlayer.length; i++)
    {
      this.master.hitPoints.push({idEnemy: 0,idPlayer: this.hitPointsPlayer[i].idPlayer, name: this.hitPointsPlayer[i].name, hitPoints: this.hitPointsPlayer[i].hitPoints})
      this.master.characterPlayer.push({nameCharacter: this.characterCampaign[i].name, namePlayer: this.hitPointsPlayer[i].name})
    }
     })
}
  modalEnemigos(modalEnemigos: HTMLElement, visible: boolean) {
    modalEnemigos.style.display = (visible) ? 'flex' : 'none';
    this.index = this.enemy.nativeElement.value;
    this.idEnemy = this.enemyCampaignPre[this.index].idEnemyPre;
    this.enemySpell(this.idEnemy);
    this.enemyEquip(this.idEnemy);
  }

  modalPersonaje(modalPersonaje: HTMLElement, visible: boolean) {
    modalPersonaje.style.display = (visible) ? 'flex' : 'none';
    this.index2 = this.player.nativeElement.value;
    this.idCharacter = this.characterCampaign[this.index2].idCharacter
    this.characterSpell(this.idCharacter);
    this.characterEquip(this.idCharacter);
  }
}
