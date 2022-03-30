import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { Enemy } from 'src/app/models/enemy';
import { EnemyHitPoints } from 'src/app/models/enemy-hit-points';
import { Spell } from 'src/app/models/spell';
import { Weapon } from 'src/app/models/weapon';
import { CampaingService } from 'src/app/shared/campaing.service';
import { CharacterService } from 'src/app/shared/character.service';
import { MasterService } from 'src/app/shared/master.service';
import { PlayersService } from 'src/app/shared/players.service';
import { WebSocketService } from '../../shared/web-socket.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-vista-master',
  templateUrl: './vista-master.component.html',
  styleUrls: ['./vista-master.component.css']
})
export class VistaMasterComponent implements OnInit, OnDestroy {
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
  @ViewChild('lifeMod') lp : ElementRef;
  public index: number = 0;
  public index2: number = 0;
  public indexCalc: number = 0;
  public idEnemy: number;
  public idCharacter: number;
  public idCampaignPre: number;
  public idCampaignActual: string;
  public campaignTitle: string = '';
  public manualMaster: string = '';
  private escuchaMasmenosplayer: Subscription;
  constructor(public campaingService:CampaingService,
              private wss: WebSocketService,
              public characterService:CharacterService,
              public master: MasterService,
              public playersService: PlayersService,
              private router:Router
              ) { 
    this.idCampaignPre = this.campaingService.actualCampaign.idCampaignPre;
    this.idCampaignActual = this.campaingService.actualCampaign.idCampaign;
    this.campaignTitle = this.campaingService.actualCampaign.campaignNamePre;
    this.master.characterPlayer = [{nameCharacter: 'Personajes', namePlayer: ''}];
    this.master.hitPoints = [{idEnemy: 0,idPlayer: 0, name: '', character: '', hitPoints: 0}];
    this.characterCampaign = [new Character ()]
    this.enemyCampaignPre = [new Enemy ()]
    this.enemiesCampaign(this.idCampaignPre)
    this.playerInGame(this.idCampaignActual)
    
    this.enemyHitPoints(this.idCampaignActual)
    this.masterManual(this.idCampaignActual)
    this.playersService.players = [0];
    this.playersService.master.name = '';
    this.playersService.inGamePlayer(this.campaingService.actualCampaign.idCampaign)
    .subscribe((resp: any) => {
      this.playersService.players = [];
      resp.resultado.forEach((item: any) => {
        this.playersService.players.push({ name: item.name, escribiendo: false, playing:false})
      })
    })
    this.campaingService.getCampaignById(this.campaingService.actualCampaign.idCampaign)
    .subscribe((resp: any) => {
      this.playersService.master.name = resp.resultado[0].name;
    })
        
  }

//Calculadora Dañar y Sanar
  
damageCalc(lifePoints:number){
  this.master.hitPoints[this.indexCalc].hitPoints = this.master.hitPoints[this.indexCalc].hitPoints - lifePoints;
  if(this.master.hitPoints[this.indexCalc].idEnemy > 0)
  {
    console.log('Esto son los parametros',this.master.hitPoints[this.indexCalc].hitPoints, this.master.hitPoints[this.indexCalc].idEnemy)
    this.master.putEnemyHitPoints(this.master.hitPoints[this.indexCalc].hitPoints, this.master.hitPoints[this.indexCalc].idEnemy)
    .subscribe((data: any) => {
      console.log('Enemy Updated',data)
    })
  }
  else
  {
    this.master.putPlayerHitPoints(this.master.hitPoints[this.indexCalc].hitPoints, this.master.hitPoints[this.indexCalc].idPlayer)
      .subscribe((data: any) => {

        let puntosVida = {
          campaignCode: this.campaingService.actualCampaign.idCampaign,
          userName: this.master.hitPoints[this.indexCalc].name,
          hitPoints: this.master.hitPoints[this.indexCalc].hitPoints
        }
        this.wss.emite('send-hitpoints', puntosVida);

      console.log('Player Updated', data)
    })
  }
}

healingCalc(){
  this.master.hitPoints[this.indexCalc].hitPoints= Number(this.master.hitPoints[this.indexCalc].hitPoints) + Number(this.lp.nativeElement.value);
  if(this.master.hitPoints[this.indexCalc].idEnemy > 0)
  {
    console.log(this.master.hitPoints[this.indexCalc].idEnemy)
    console.log(Number(this.master.hitPoints[this.indexCalc].hitPoints))
    console.log(this.master.hitPoints[this.indexCalc].idCampaign)
    this.master.putEnemyHitPoints(Number(this.master.hitPoints[this.indexCalc].hitPoints), this.master.hitPoints[this.indexCalc].idEnemy)
    .subscribe((data: any) => {
      console.log('Enemy Updated',data.respuesta)
    })
  }
  else
  {
    this.master.putPlayerHitPoints(Number(this.master.hitPoints[this.indexCalc].hitPoints), this.master.hitPoints[this.indexCalc].idPlayer)
    .subscribe((data:any) =>{

      let puntosVida = {
        campaignCode: this.campaingService.actualCampaign.idCampaign,
        userName: this.master.hitPoints[this.indexCalc].name,
        hitPoints: this.master.hitPoints[this.indexCalc].hitPoints
      }
      this.wss.emite('send-hitpoints', puntosVida);
      
      console.log('Player Updated', data.respuesta)
    })
  }
}
///Master Manual
  masterManual(idCampaign:string){
    this.master.getManual(idCampaign).subscribe((data:any) =>{
      this.campaignTitle = data.resultado[0].campaignName;
      this.manualMaster = String (data.resultado[0].routeMasterManual);
      console.log(this.manualMaster)
    })
  }

  

///Player and Enemy in game

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
    this.master.hitPoints.splice(0,1)
    for(let i=0; i<this.hitPointsEnemy.length; i++)
    {
      this.master.hitPoints.push({idEnemy: this.hitPointsEnemy[i].idEnemy,idPlayer: 0, name: this.hitPointsEnemy[i].name, hitPoints: this.hitPointsEnemy[i].hitPoints})
    }
  })
}

playerHitPoints(idCampaign: string){
  this.playersService.inGamePlayer(idCampaign).subscribe((data:any) =>{
    this.hitPointsPlayer = data.resultado;
    if(!this.hitPointsPlayer)
    {

    }
    else{
      this.master.characterPlayer = []
      for(let i=0; i<this.hitPointsPlayer.length; i++)
      {
        this.master.hitPoints.push({idEnemy: 0,idPlayer: this.hitPointsPlayer[i].idPlayer, name: this.hitPointsPlayer[i].name, hitPoints: this.hitPointsPlayer[i].hitPoints})
        this.master.characterPlayer.push({nameCharacter: this.characterCampaign[i].name, namePlayer: this.hitPointsPlayer[i].name})
      }
    }
     })
}

select(){
  this.indexCalc = this.calc.nativeElement.value;
}

///Modales
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

  ngOnDestroy(): void {
    this.escuchaMasmenosplayer.unsubscribe();
  }
  //Redirgir al actualizar
  ngOnInit(): void {
    this.escuchaMasmenosplayer = this.wss.escucha('new-masmenosplayer').subscribe((data: any) => {
      const { campaignCode, player, viene } = data;
      if (campaignCode == this.campaingService.actualCampaign.idCampaign) {
        if(viene){
          this.playerHitPoints(this.idCampaignActual)
        }else{
          let indice = this.master.characterPlayer.findIndex(item => item.name == player)
          if(indice >=0){
            this.master.characterPlayer.splice(indice,1);
          }
        }
      }
    }) 
    if(this.campaingService.actualCampaign.idCampaign == undefined){
      this.router.navigate(['/perfil'])
    }
  }
}
