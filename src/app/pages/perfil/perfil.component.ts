import { Component, OnInit, OnDestroy } from '@angular/core';
import { Campaing } from 'src/app/models/campaing';
import { User } from 'src/app/models/user';
import { CampaingService } from 'src/app/shared/campaing.service';
import { PlayersService } from 'src/app/shared/players.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../shared/web-socket.service';
import { CharacterService } from 'src/app/shared/character.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit, OnDestroy {
  public detalles: boolean = false;
  public opcionActiva: number;
  public ultimaOpcionActiva: number;
  public urlAvatar: string;
  public indiceAvatarSeleccionado: number = -1;
  public avatarSeleccionado: boolean = false;
  public arrayAvatares: string[];
  public user: User;
  public masterCampaign:Campaing[];
  public playerCampaign:Campaing[];
  private escuchaFinalizar: Subscription;

  constructor(public userService: UserService,
              public campaignService:CampaingService,
              public playerService:PlayersService,
              private wss: WebSocketService,
              private router:Router,
              public characterService: CharacterService) {
    this.user = userService.user;
    this.urlAvatar = this.user.urlAvatar;
    this.opcionActiva = 2;
    this.ultimaOpcionActiva = 2;
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

    //Cargar partidas de master
    this.userService.getCampaignMaster(this.userService.user.idUser).subscribe((data:any)=>{
      this.masterCampaign = data.resultado
    })
    //Cargar partidas de player
    this.userService.getCampaignPlayer().subscribe((data:any)=>{ 
      this.playerCampaign = data.resultado 
    }) 
    this.playerService.players = []
  }

  ngOnInit(): void {
    this.escuchaFinalizar = this.wss.escucha('new-finalizar').subscribe((data: any) => {
      this.userService.getCampaignPlayer().subscribe((data:any)=>{ 
        this.playerCampaign = data.resultado 
      }) 
    });
  }

  ngOnDestroy(): void {
    this.escuchaFinalizar.unsubscribe();
  }

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
    this.userService.user.urlAvatar = this.urlAvatar;
    this.modalAvatar(veloModalAvatar, false);
    let avatar = {
      idUser: this.user.idUser,
      urlAvatar: this.urlAvatar,
    };
    let edit = this.userService.userEdit(avatar);
    edit.subscribe((data) => {
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
            if (data.ok) {
              let changPass = {
                idUser: this.user.idUser,
                password: newPass.value
              }
              this.userService.userEdit(changPass).subscribe((data) => {
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

  //Obtiene los datos de la campaña en juego como master
   getCampaignMaster(game:Campaing){  
    this.campaignService.actualCampaign = game
      this.router.navigate(['/master'])

   }
   //Obtiene los datos de la campaña en juego como player
   getCampaignPlayer(game:any){
    this.campaignService.actualCampaign = game
    //Inicializar players
    this.playerService.inGamePlayer(this.campaignService.actualCampaign.idCampaign).subscribe((data:any)=>{
      for(const player of data.resultado){
        if(player.name == this.userService.user.name){
          this.playerService.player = player 
        }
        this.characterService.getAll().subscribe((data:any)=>{
          let character = data[this.playerService.player.idCharacter - 1]
          this.characterService.getSpell(character.idCharacter).subscribe((data:any)=>{ //<== Introducir hechizos
            character.spell = data.resultado
            this.characterService.getWeapon(character.idCharacter).subscribe((data:any)=>{  //<== Introducir equipo
              character.weapon = data.resultado
              this.characterService.character = character
              this.router.navigate(['/player'])
            })
          })
        })
      }
      
      
    })
   }
   logOut(){
     sessionStorage.clear()
   }
}


