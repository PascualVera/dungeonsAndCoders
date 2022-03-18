import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css']
})
export class GameHeaderComponent implements OnInit {

  public codigoSala: string;

  constructor(public router:Router) { 
    this.codigoSala = 'HRDsd234u'
  }

  ngOnInit(): void {
  }

  modalFinalizar(veloModal: HTMLElement, visible: boolean) {
    veloModal.style.display = (visible) ? 'flex' : 'none';
    
  }

}
