import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  // TODO: Provisional para alternar true false entre elección de detalles y campañas
  public detalles: boolean = true;
  public opcionActiva: number;
  public ultimaOpcionActiva: number;
  public urlAvatar: string;
  public indiceAvatarSeleccionado: number = -1;
  public avatarSeleccionado: boolean = false;
  public arrayAvatares: string[];
  public user: User;
  constructor(public userService: UserService) {
    this.user = userService.user;
    this.urlAvatar = this.user.urlAvatar;
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
      '../../../assets/images/avatares/avatar10.png',
    ];
  }

  ngOnInit(): void {}

  modalAvatar(veloModalAvatar: HTMLElement, visible: boolean) {
    if (visible) {
      this.ultimaOpcionActiva = this.opcionActiva;
      veloModalAvatar.style.display = 'flex';
      this.opcionActiva = 3;
    } else {
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

  async elegirAvatar(veloModalAvatar: HTMLElement) {
    this.urlAvatar = this.arrayAvatares[this.indiceAvatarSeleccionado];
    this.modalAvatar(veloModalAvatar, false);
    let avatar = {
      idUser: this.user.idUser,
      urlAvatar: this.urlAvatar,
    };
    console.log(this.user);
    let edit = this.userService.userEdit(avatar);
    edit.subscribe((data) => {
      console.log(data);
    });
  }
}
