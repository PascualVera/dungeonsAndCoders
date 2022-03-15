import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // TODO: Provisional para alternar true false entre elección de detalles y campañas
  public detalles: boolean = false;

  constructor() { }
  
  ngOnInit(): void {
  }
  
  // TODO: Provisionalpara abrir modal
  modalAvatar(veloModal: HTMLElement, visible: boolean) {
    veloModal.style.display = (visible) ? 'flex' : 'none';
  }
}
