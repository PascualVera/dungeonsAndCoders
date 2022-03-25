import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  public character: Character
  public characters:Character[]
  constructor(public characterService:CharacterService) {
   
  }

  ngOnInit(): void {
  }

}
