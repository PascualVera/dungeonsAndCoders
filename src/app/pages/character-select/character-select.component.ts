import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css'],
})
export class CharacterSelectComponent implements OnInit {
  public scrollCount: number;
  public characters: any[];
  constructor(public characterService: CharacterService) {
    this.scrollCount = 0;
    this.getCharacters();
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
    img.src = this.characterService.character.image;
    console.log(this.characterService.character.image);
    rasgos.innerHTML = this.characterService.character.rasgos;
    ideales.innerHTML = this.characterService.character.ideales;
    vinculos.innerHTML = this.characterService.character.vinculos;
    defectos.innerHTML = this.characterService.character.defectos;
    name.innerHTML = this.characterService.character.name;
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
    console.log(this.characters);
  }

  getCharacters() {
    this.characterService.getAll().subscribe((data: any) => {
      this.characters = data;
    });
  }
  shadow(img: any, index: number) {
    console.log(index);
    if (index == 0) {
      img.setAttribute('class', 'imagen_rogue');
    } else if (index == 1) {
      img.setAttribute('class', 'imagen_warrior');
    } else if (index == 2) {
      img.setAttribute('class', 'imagen_cleric');
    } else if (index == 3) {
      img.setAttribute('class', 'imagen_mage');
    } else if (index == 4) {
      img.setAttribute('class', 'imagen_ranger');
    } else if (index == 5) {
      img.setAttribute('class', 'imagen_barbarian');
    }
  }
  ngOnInit(): void {}
}
