import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  // TODO: Provisional para alternar true false entre elección de detalles y campañas
  public detalles: boolean = false;

  public opcionActiva: number;
  public ultimaOpcionActiva: number;

  public urlAvatar: string;
  public indiceAvatarSeleccionado: number = -1;
  public avatarSeleccionado: boolean = false;
  public arrayAvatares: string[];

  constructor() { 
    this.urlAvatar = '../../../assets/images/avatares/avatar00.png';
    this.opcionActiva = 1;
    this.ultimaOpcionActiva = 1;
    this.arrayAvatares = [
      '../../../assets/images/avatares/avatar01.png',
      '../../../assets/images/avatares/avatar02.png',
      '../../../assets/images/avatares/avatar03.png',
      '../../../assets/images/avatares/avatar04.png',
      '../../../assets/images/avatares/avatar05.png',
      '../../../assets/images/avatares/avatar06.png',
      '../../../assets/images/avatares/avatar07.png',
      '../../../assets/images/avatares/avatar08.png',
      '../../../assets/images/avatares/avatar09.png',
      '../../../assets/images/avatares/avatar10.png'
    ]
  }
  
  ngOnInit(): void {
  }
    
  modalAvatar(veloModalAvatar: HTMLElement, visible: boolean) {
    if (visible) {
      this.ultimaOpcionActiva = this.opcionActiva;
      veloModalAvatar.style.display = 'flex';
      this.opcionActiva = 3;
    }else {
      this.opcionActiva = this.ultimaOpcionActiva;
      veloModalAvatar.style.display = 'none';
    }
    this.avatarSeleccionado = false;
    this.indiceAvatarSeleccionado = -1;
  }

  activarOpcion(opcion: number) {
    this.opcionActiva = opcion;
    if (opcion == 1) {
      this.detalles = true;
    } else {
      this.detalles = false;
    }
  }

  seleccionarAvatar(i: number) {
    this.indiceAvatarSeleccionado = i;
    this.avatarSeleccionado = true;
  }

  elegirAvatar(veloModalAvatar: HTMLElement) {
    this.urlAvatar = this.arrayAvatares[this.indiceAvatarSeleccionado];
    this.modalAvatar(veloModalAvatar, false)
  }

}
