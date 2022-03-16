import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-select',
  templateUrl: './character-select.component.html',
  styleUrls: ['./character-select.component.css'],
})
export class CharacterSelectComponent implements OnInit {
  public scrollCount: number;
  constructor() {
    this.scrollCount = 0;
  }
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
  showCharacter(info: any, name: any) {
    info.src = '../../../assets/images/characters/barbarian.png';
    name.innerHTML = 'Barbarian';
    info.style.display = 'block';
    name.style.display = 'block';
  }
  ngOnInit(): void {}
}
