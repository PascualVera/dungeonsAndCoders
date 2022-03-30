import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { Player } from 'src/app/models/player';
import { Weapon } from 'src/app/models/weapon';
import { CampaingService } from 'src/app/shared/campaing.service';
import { CharacterService } from 'src/app/shared/character.service';
import { PlayersService } from 'src/app/shared/players.service';
import { UserService } from 'src/app/shared/user.service';
import { WebSocketService } from '../../shared/web-socket.service';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css'],
})
export class CharacterSelectComponent implements OnInit {
  public scrollCount: number;
  public characters: Character[];
  
  constructor(public characterService: CharacterService,
    private wss: WebSocketService,
    public playerService:PlayersService,
    public userService: UserService,
    public campaignService:CampaingService,
    private router:Router) {
      this.scrollCount = 0;
      this.getCharacters();
      this.characterService.getCharactersInGame(this.campaignService.actualCampaign.idCampaign).subscribe((data:any)=>{
      this.characterService.charactersInGame = []
        for(const id of data.respuesta){
          this.characterService.charactersInGame.push(id.idCharacter)
        }
      })
     
  }

  //Metodos logicos
  getCharacters() {
    this.characterService.getAll().subscribe((data: any) => {
      this.characters = data;
    });
  }
  postPlayer(){
    this.playerService.player = new Player (this.characterService.character.hitPoint,
                                            this.characterService.character.idCharacter,
                                            this.userService.user.idUser,
                                            this.campaignService.actualCampaign.idCampaign)
    this.campaignService.getCampaignById(this.campaignService.actualCampaign.idCampaign).subscribe((data:any)=>{
      if(data.resultado[0].numPlayer < data.resultado[0].maxPlayer){
        this.insertPlayer()
        this.playerService.createPlayers(this.playerService.player).subscribe(()=>{
          let masmenosPlayer = {
            campaignCode: this.campaignService.actualCampaign.idCampaign,
            player: this.userService.user.name,
            viene: true
          }
          this.wss.emite('send-masmenosplayer', masmenosPlayer);
          this.router.navigate(['/player'])
        })
      }else{
        
        this.router.navigate(['/campaing'])
      }
    })
  }

  insertPlayer(){
      let numPlayer= {numPlayer: this.campaignService.actualCampaign.numPlayer +1, idCampaign: this.campaignService.actualCampaign.idCampaign}
      this.campaignService.putCampaing(numPlayer).subscribe(()=>{
      })
   }
   
  //Metodos de visual
  loreScrollDown(lore: any, buttomUp: any, buttomDown: any) {
    this.scrollCount++;
    lore.style.transform = `translateY(${this.scrollCount * -20}vh)`;
    buttomDown.disabled = this.scrollCount == 3 ? true : false;
    buttomUp.disabled = this.scrollCount == 0 ? true : false;
  }
  loreScrollUp(lore: any, buttomUp: any, buttomDown: any) {
    this.scrollCount--;
    lore.style.transform = `translateY(${this.scrollCount * -20}vh)`;
    buttomDown.disabled = this.scrollCount == 3 ? true : false;
    buttomUp.disabled = this.scrollCount == 0 ? true : false;
  }
  showCharacter(
    character: Character,
    rasgos: HTMLElement,
    ideales: HTMLElement,
    vinculos: HTMLElement,
    defectos: HTMLElement,
    name: HTMLElement,
    img: any,
    fuerzaMod: any,
    fuerza: any,
    intMod: any,
    int: any,
    dexMod: any,
    dex: any,
    sabMod: any,
    sab: any,
    constMod: any,
    constitucion: any,
    carMod: any,
    car: any,
    speed: any,
    armor: any,
    iniciativa: any,
    golpe: any,
    dados: any,
    equipo: any,
    index: number,
    button: any
  ) {
    this.characterService.character = character;
    this.characterService.getSpell(character.idCharacter).subscribe((data:any)=>{
      this.characterService.character.spell = data.resultado
     
    })
    this.characterService.getWeapon(character.idCharacter).subscribe((data:any)=>{
      this.characterService.character.weapon = data.resultado
      equipo.innerHTML = ''
      for(const weapon of data.resultado){
        equipo.innerHTML += `<span>${weapon.nameEquip}</span> `
      }
    })
    img.src = this.characterService.character.image;
    img.style.display='block'
    rasgos.innerHTML = this.characterService.character.rasgos;
    ideales.innerHTML = this.characterService.character.ideales;
    vinculos.innerHTML = this.characterService.character.vinculos;
    defectos.innerHTML = this.characterService.character.defectos;
    name.innerHTML = this.characterService.character.class;
    fuerzaMod.innerHTML = this.characterService.character.strengthMod;
    fuerza.innerHTML = this.characterService.character.strength;
    intMod.innerHTML = this.characterService.character.inteligenceMod;
    int.innerHTML = this.characterService.character.inteligence;
    dexMod.innerHTML = this.characterService.character.dexterityMod;
    dex.innerHTML = this.characterService.character.dexterity;
    sabMod.innerHTML = this.characterService.character.wisdomMod;
    sab.innerHTML = this.characterService.character.wisdom;
    constMod.innerHTML = this.characterService.character.constitutionMod;
    constitucion.innerHTML = this.characterService.character.constitution;
    carMod.innerHTML = this.characterService.character.charismaMod;
    car.innerHTML = this.characterService.character.charisma;
    speed.innerHTML = this.characterService.character.speed;
    armor.innerHTML = this.characterService.character.armor;
    iniciativa.innerHTML = this.characterService.character.initiative;
    golpe.innerHTML = this.characterService.character.hitPoint;
    dados.innerHTML = this.characterService.character.hitDice;

    this.shadow(img, index)
    button.disabled = false;
    
  }
  shadow(img: any, index: number) {
    if (index == 2) {
      img.setAttribute('class', 'imagen_rogue');
    } else if (index == 0) {
      img.setAttribute('class', 'imagen_warrior');
    } else if (index == 1) {
      img.setAttribute('class', 'imagen_cleric');
    } else if (index == 3) {
      img.setAttribute('class', 'imagen_mage');
    } else if (index == 5) {
      img.setAttribute('class', 'imagen_ranger');
    } else if (index == 4) {
      img.setAttribute('class', 'imagen_barbarian');
    }
  }
 
  ngOnInit(): void {
    this.userService.getCampaignPlayer().subscribe((data:any)=>{
      for(const id of data.resultado){
        if(id.idCampaign == this.campaignService.actualCampaign.idCampaign){
          this.router.navigate(['/campaing'])
        }
      }
    })
  }
}
