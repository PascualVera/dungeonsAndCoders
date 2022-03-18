import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css']
})
export class GameHeaderComponent implements OnInit {

  public codigoSala: string;

  constructor() { 
    this.codigoSala = 'HRDsd234u'
  }

  ngOnInit(): void {
  }

  modalFinalizar(veloModal: HTMLElement, visible: boolean) {
    veloModal.style.display = (visible) ? 'flex' : 'none';
  }

}
