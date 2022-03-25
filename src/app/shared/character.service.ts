import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  public characters: Character[];
  public character: Character;
  public life: number;
  public url:string
  public charactersInGame:number[]
  constructor(private http: HttpClient) {
    this.url = 'https://dungeons-and-coders-api.herokuapp.com'
    // this.url = 'http://localhost:4000'
    this.getAll().subscribe((data:Character[])=>{
      this.characters = data
      this.getSpell(5).subscribe((data:any)=>{
        this.characters[4].spell = data.resultado
        this.getWeapon(5).subscribe((data:any)=>{
          this.characters[4].weapon = data.resultado
          console.log(this.characters[4].weapon)
          this.character = this.characters[4]
        })
      })
    })
    
  }

  getAll() {
    return this.http.get(this.url + '/character');
  }
  getSpell(idCharacter:number){
    return this.http.get(this.url + '/spell?idCharacter=' + String(idCharacter))
  }
  getWeapon(idCharacter:number){
    return this.http.get(this.url + '/equip?idCharacter=' + String(idCharacter))
  }
  getCharactersInGame(idCampaign:string){
    return this.http.get(this.url + `/characterInGame?id=${idCampaign}`)
  }
}
