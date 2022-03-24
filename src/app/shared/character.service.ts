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
  constructor(private http: HttpClient) {
    // this.url = 'https://dungeons-and-coders-api.herokuapp.com'
    this.url = 'http://localhost:4000'
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
}
