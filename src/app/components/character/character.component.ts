import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  public character: Character;
  public lifePoints: number;
  constructor(public characterService: CharacterService) {
    this.character = characterService.character;
    this.lifePoints = this.characterService.character.hitPoint;
  }
  hit(lifeBar: any) {
    this.lifePoints--;
    let lifePoints = this.lifePoints;
    let total = this.character.hitPoint;
    let modificador = (100 * lifePoints) / total;
    console.log(total);
    console.log(lifePoints);
    console.log(modificador);
    lifeBar.style = `background: rgb(0,255,0);
     background: linear-gradient(90deg, rgba(0,255,0,1) ${modificador}%, rgba(255,255,255,0) ${modificador}%); width: 80%`;
  }
  ngOnInit(): void {}
}
