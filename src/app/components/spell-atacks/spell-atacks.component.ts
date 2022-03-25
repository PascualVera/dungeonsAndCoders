import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';

@Component({
  selector: 'app-spell-atacks',
  templateUrl: './spell-atacks.component.html',
  styleUrls: ['./spell-atacks.component.css']
})
export class SpellAtacksComponent implements OnInit {
  public character: Character
  public characters:Character[]
  constructor(public characterService:CharacterService) {
   
  }
  ngOnInit(): void {
  }

}
