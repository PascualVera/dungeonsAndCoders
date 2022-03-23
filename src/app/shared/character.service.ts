import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  public characters: Character[];
  public character: any;
  public life: number;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(
      'https://dungeons-and-coders-api.herokuapp.com/character'
    );
  }
}
