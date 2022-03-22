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

  elegirAvatar(veloModalAvatar: HTMLElement) {
    this.urlAvatar = this.arrayAvatares[this.indiceAvatarSeleccionado];
    this.modalAvatar(veloModalAvatar, false);
    let avatar = {
      idUser: this.user.idUser,
      urlAvatar: this.urlAvatar,
    };
    console.log(avatar);
    let edit = this.userService.userEdit(avatar);
    edit.subscribe((data) => {
      console.log(data);
    });
  }

  changePass(oldPass: HTMLInputElement, newPass: HTMLInputElement, newPass2: HTMLInputElement, verify: HTMLElement, tecla?: number) {
    if (!tecla || tecla == 13) {
      if (oldPass.value == "" || newPass.value == "" || newPass2.value == "") {
        verify.style.visibility = 'visible'
        verify.style.background = 'rgba(255, 0, 0, 0.795)'
        verify.innerHTML = 'Introduce todos los datos'
        if (oldPass.value == '') {
          oldPass.style.border = '0.5vh solid red'
        }
        if (newPass.value == '' || newPass2.value == '') {
          newPass.style.border = '0.5vh solid red'
          newPass2.style.border = '0.5vh solid red'
        }
      } else {
        if (this.validatePassword(newPass) && this.validatePassword2(newPass, newPass2)) {
          let credentials = {
            nameEmail: this.user.email,
            password: oldPass.value
          }
          this.userService.login(credentials).subscribe((data: any) => {
            console.log(data)
            if (data.ok) {
              let changPass = {
                idUser: this.user.idUser,
                password: newPass.value
              }
              this.userService.userEdit(changPass).subscribe((data) => {
                console.log(data)
                verify.style.visibility = 'visible'
                verify.innerHTML = 'Tu constraseña ha sido actualizada correctamente'
                verify.style.background = 'rgba(0, 128, 0, 0.692)'
                oldPass.value = '';
                newPass.value = '';
                newPass2.value = '';
                newPass.style.border = '0.5vh solid #a34c50';
                newPass2.style.border = '0.5vh solid #a34c50';
                oldPass.focus();
              })
            } else {
              verify.style.visibility = 'visible'
              verify.style.background = 'rgba(255, 0, 0, 0.795)'
              verify.innerHTML = 'Contraseña Incorrecta'
              oldPass.style.border = '0.5vh solid red';
            }
          })
        }
      }
    }
  }

    validatePassword(password:HTMLInputElement, oldPass?: HTMLInputElement, verify?:HTMLElement){
      if (oldPass) {
        oldPass.style.border = '0.5vh solid #a34c50';        
      }
      if (verify) {
        verify.style.visibility = 'hidden'
      }
      const validate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      if(password.value == ''){
        return false
      }
      if(password.value.match(validate)&&/\s/g.test(password.value) == false){ 
        password.style.border = '0.5vh solid green'
        return true
      }else{
        password.style.border = '0.5vh solid red'
        return false
      }
    }
    validatePassword2( pass:HTMLInputElement,pass2:HTMLInputElement,oldPass?: HTMLInputElement, verify?:HTMLElement){
      if (oldPass) {
        oldPass.style.border = '0.5vh solid #a34c50';
      }
      if (verify) {
        verify.style.visibility = 'hidden'
      }
      if(pass.value == pass2.value){
        pass2.style.border = '0.5vh solid green'
        return true
      }else{
        pass2.style.border = '0.5vh solid red'
        return false
      }
    }
}
