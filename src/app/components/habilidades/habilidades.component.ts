import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  public character: Character
  public characters:Character[]
  constructor(public characterService:CharacterService) {
    characterService.getAll().subscribe((data:Character[])=>{
      this.characters = data
      characterService.getSpell(4).subscribe((data:any)=>{
        this.characters[3].spell = data.resultado
        console.log(this.characters[3])
        characterService.getWeapon(4).subscribe((data:any)=>{
          this.characters[3].weapon = data.resultado
        })
      })
    })
   }

  ngOnInit(): void {
  }

}
