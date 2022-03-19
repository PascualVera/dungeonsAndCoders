import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
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

  modal(veloModal: HTMLElement, visible: boolean) {
    veloModal.style.display = (visible) ? 'flex' : 'none';
    
  }
  copyCode(confirm:HTMLElement){
    confirm.innerHTML = 'Copiado'
    navigator.clipboard.writeText(this.codigoSala)
    setTimeout(()=>{
      confirm.innerHTML = 'Copiar Código'
    },1000)
  }

}
