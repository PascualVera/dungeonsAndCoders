import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';
import { PlayersService } from 'src/app/shared/players.service';
import { CampaingService } from '../../shared/campaing.service';
import { UserService } from '../../shared/user.service';
import { WebSocketService } from '../../shared/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit, OnDestroy {

  private escuchaHitPoints: Subscription;

  public character: Character;
  public lifePoints: number;
  public characters: Character[]
  public dataIndex:number
  @ViewChild('vida')lifebar:ElementRef
  constructor(public characterService: CharacterService,
              public playerService:PlayersService,
              private userService: UserService,
              private wss: WebSocketService,
              private campaignService: CampaingService) {
    this.dataIndex = 0
    this.characterService.character = new Character();
    console.log('ajurado', this.characterService.character)
    characterService.getAll().subscribe((data:Character[])=>{
      let character = data[playerService.player.idCharacter - 1]
      this.characterService.getSpell(character.idCharacter).subscribe((data:any)=>{ //<== Introducir hechizos
        console.log(data)
        character.spell = data.resultado
        this.characterService.getWeapon(character.idCharacter).subscribe((data:any)=>{  //<== Introducir equipo
          character.weapon = data.resultado
          console.log(data)
          this.characterService.character = character
        })
      })
    })
    
  }
  showCharacter(){
    this.dataIndex = 0
  }
  showSkills(){
    this.dataIndex = 1
  }
  showSpell(){
    this.dataIndex = 2
  }
  showWeapons(){
    this.dataIndex = 3
  }
  hit() {
    let lifePoints = this.playerService.player.hitPoints;
    let total = this.characterService.character.hitPoint;
    let modificador = (100 * lifePoints) / total;
    this.lifebar.nativeElement.style = `background: rgb(0,255,0);
     background: linear-gradient(90deg, rgba(0,255,0,1) ${modificador}%, rgba(255,255,255,0) ${modificador}%); width: 80%`;
  }
 
  ngOnInit(): void {
    this.escuchaHitPoints = this.wss.escucha('new-hitpoints').subscribe((data: any) => {
      const { campaignCode, userName, hitPoints } = data;
      if (campaignCode == this.campaignService.actualCampaign.idCampaign && userName == this.userService.user.name) {
        this.playerService.player.hitPoints = hitPoints;
        this.hit()
      }
    }) 
  }

  ngOnDestroy(): void {
    this.escuchaHitPoints.unsubscribe();
  }
}
