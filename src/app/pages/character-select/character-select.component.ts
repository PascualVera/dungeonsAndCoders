import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { Player } from 'src/app/models/player';
import { CampaingService } from 'src/app/shared/campaing.service';
import { CharacterService } from 'src/app/shared/character.service';
import { PlayersService } from 'src/app/shared/players.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css'],
})
export class CharacterSelectComponent implements OnInit {
  public scrollCount: number;
  public characters: Character[];
  
  constructor(public characterService: CharacterService,public playerService:PlayersService, public userService: UserService, public campaignService:CampaingService) {
    this.scrollCount = 0;
    this.getCharacters();
    this.characterService.getCharactersInGame(this.campaignService.idCampaign).subscribe((data:any)=>{
      this.characterService.charactersInGame = []
      for(const id of data.respuesta){
        this.characterService.charactersInGame.push(id.idCharacter)
      }
      console.log(this.characterService.charactersInGame)
      this.reserva()
      
      
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
      console.log(this.characterService.character.spell)
    })
    this.characterService.getWeapon(character.idCharacter).subscribe((data:any)=>{
      this.characterService.character.weapon = data.resultado
    })
    img.src = this.characterService.character.image;
    console.log(this.characterService.character.image);
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

    img.style.display = 'block';
    ////Mostrar Imagen Effects////
    this.shadow(img, index);
    //Cargar personaje///

    button.disabled = false;
    console.log(this.characterService.character);
  }

  getCharacters() {
    this.characterService.getAll().subscribe((data: any) => {
      this.characters = data;
    });
  }
  shadow(img: any, index: number) {
    console.log(index);
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
  postPlayer(){
    this.playerService.player = new Player (this.characterService.character.hitPoint,
                                            this.characterService.character.idCharacter,
                                            this.userService.user.idUser,
                                            this.campaignService.idCampaign)

    console.log(this.playerService.player)
    this.playerService.createPlayers(this.playerService.player).subscribe((data)=>{
      console.log(data)
      this.playerService.inGamePlayer(this.campaignService.idCampaign).subscribe((data:any)=>{
        
        for(const player of data.resultado){
          this.playerService.players.push({name: player.name, escribiendo: false})
        }
        
      })
    })
  }

  reserva(){
      let numPlayer= {numPlayer: this.campaignService.actualCampaign.numPlayer +1, idCampaign: this.campaignService.actualCampaign.idCampaign}
      this.campaignService.putCampaing(numPlayer).subscribe((data)=>{
        console.log(data)
        console.log(this.campaignService.actualCampaign)
      })
    
   }
   cancelarReserva(){
    let numPlayer= {numPlayer: this.campaignService.actualCampaign.numPlayer ,idCampaign: this.campaignService.actualCampaign.idCampaign}
      this.campaignService.putCampaing(numPlayer).subscribe((data)=>{
        console.log(data)
        console.log(this.campaignService.actualCampaign.numPlayer)
      })
    
   }
  ngOnInit(): void {}
}
