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
    characterService.getAll().subscribe((data:Character[])=>{
      let character = data[playerService.player.idCharacter - 1]
      this.characterService.getSpell(character.idCharacter).subscribe((data:any)=>{ //<== Introducir hechizos
        character.spell = data.resultado
        this.characterService.getWeapon(character.idCharacter).subscribe((data:any)=>{  //<== Introducir equipo
          character.weapon = data.resultado
          this.characterService.character = character
          this.hit()
        })
      })
    })
   
      
    
    
  }
  showCharacter(personaje: HTMLElement){
    this.dataIndex = 0
    personaje.style.display = 'block';
    this.hit()
  }
  showSkills(personaje: HTMLElement){
    personaje.style.display = 'none';
    this.dataIndex = 1
  }
  showSpell(personaje: HTMLElement){
    personaje.style.display = 'none';
    this.dataIndex = 2
  }
  showWeapons(personaje: HTMLElement){
    personaje.style.display = 'none';
    this.dataIndex = 3
  }
  hit() {
    let lifePoints = this.playerService.player.hitPoints;
    let total = this.characterService.character.hitPoint;
    let modificador = (100 * lifePoints) / total;
    if(modificador > 66){
    this.lifebar.nativeElement.style = `background: #7df9ff;
     background: linear-gradient(90deg, #7df9ff ${modificador}%, rgba(255,255,255,0) ${modificador}%); width: 80%`;
    }else if(modificador > 33){
      this.lifebar.nativeElement.style = `background: var(--beige);
       background: linear-gradient(90deg, var(--beige) ${modificador}%, rgba(255,255,255,0) ${modificador}%); width: 80%;
       transition: background 2s linear`;
      } else if(modificador > 0){
        this.lifebar.nativeElement.style = `background: var(--auxiliarRed);
         background: linear-gradient(90deg, var(--auxiliarRed) ${modificador}%, rgba(255,255,255,0) ${modificador}%); width: 80%`;
        }else if(modificador <= 0){
          this.lifebar.nativeElement.style = 'background: none; width: 80%'
        }
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
