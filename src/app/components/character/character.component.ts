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
  public characters: Character[]
  public dataIndex:number
  constructor(public characterService: CharacterService) {
    this.dataIndex = 0
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
