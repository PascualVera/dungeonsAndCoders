import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Tirada } from 'src/app/models/tirada';
import { MensajeChat } from '../../models/mensaje-chat';
import { UserService } from '../../shared/user.service';
import { PlayersService } from '../../shared/players.service';
import { WebSocketService } from 'src/app/shared/web-socket.service';
import { MensajesChatService } from '../../shared/mensajes-chat.service';
import { CampaingService } from '../../shared/campaing.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  private delayKeyUp: any;
  private delayPlayingMaster: any;
  private delayPlayingPlayer: any[] = [null, null, null, null, null, null];
  private intervaloPlaying: any;
  private escuchaPlaying: Subscription;
  private escuchaMessage: Subscription;
  private escuchaEscribiendo: Subscription;
  private escuchaMasmenosplayer: Subscription;
  public nuevoMensaje: boolean = true;
 
  constructor(public ps: PlayersService,
              public us: UserService,
              public cs: CampaingService,
              public mcs: MensajesChatService,
              private router: Router,
              private wss: WebSocketService
              ) {

    this.mcs.getCampaignMessages(this.cs.actualCampaign.idCampaign)
      .subscribe((resp: any) => {
        if (resp.ok) {  
          this.mcs.mensajesChat = [];
          resp.resultado.forEach((item: MensajeChat) => {
            const { campaignCode, emisor, mensaje, fecha } = item;
            let mensajeChat = {
              campaignCode: campaignCode,
              emisor: emisor,
              mensaje: mensaje,
              fecha: new Date(fecha)
            }
            this.mcs.mensajesChat.push(mensajeChat);
          })
        }
      })
  }

  ngOnInit(): void {
    this.escuchaMessage = this.wss.escucha('new-message').subscribe((data: any) => {
      const { campaignCode, emisor, mensaje, fecha } = data;
      if (campaignCode == this.cs.actualCampaign.idCampaign) {
        this.mcs.mensajesChat.push(new MensajeChat(campaignCode, emisor, mensaje, new Date(fecha)));
        this.nuevoMensaje = true;
      }
    })  
    this.escuchaEscribiendo = this.wss.escucha('new-escribiendo').subscribe((data: any) => {
      const { campaignCode, player, estado } = data;
      if (campaignCode == this.cs.actualCampaign.idCampaign) {
        this.ps.setEscribiendo(player, estado);
      }
    });
    this.escuchaMasmenosplayer = this.wss.escucha('new-masmenosplayer').subscribe((data: any) => {
      const { campaignCode, player, viene } = data;
      if (campaignCode == this.cs.actualCampaign.idCampaign) {
        if (viene) {
          this.ps.players.push({name: player, escribiendo: false, playing: true});
          this.cs.actualCampaign.numPlayer++
        } else {
          let indice = this.ps.players.findIndex(item => item.name == player)
          if (indice >= 0) {
            this.ps.players.splice(indice, 1);
            this.cs.actualCampaign.numPlayer--
          }
        }
      }
    });
    this.escuchaPlaying = this.wss.escucha('new-playing').subscribe((data: any) => {
      const { campaignCode, name } = data;
      if (campaignCode == this.cs.actualCampaign.idCampaign) {
        if (this.ps.master.name == name) {
          if (this.delayPlayingMaster) {
            clearTimeout(this.delayPlayingMaster);
          }
          this.delayPlayingMaster = setTimeout(() => {
            this.ps.master.playing = false;            
          }, 1100);
          this.ps.master.playing = true;
        } else {
          let indice = this.ps.players.findIndex(item => item.name == name);
          if (indice >= 0) {
            if (this.delayPlayingPlayer[indice]) {
              clearTimeout(this.delayPlayingPlayer[indice])
            };
            this.ps.players[indice].playing = true;
            if (this.delayPlayingPlayer[indice]) {
              clearTimeout(this.delayPlayingPlayer[indice]);
              this.delayPlayingPlayer[indice] = null;
            }
            this.delayPlayingPlayer[indice] = setTimeout(() => {
              let i = indice;
              if (this.ps.players[i]) {
                this.ps.players[i].playing = false;
              }
            }, 1100);
          }
        }
      }
    });
    this.playing();
    this.intervaloPlaying = setInterval(() => { this.playing() }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervaloPlaying);
    this.escuchaPlaying.unsubscribe();
    this.escuchaMessage.unsubscribe();
    this.escuchaEscribiendo.unsubscribe();
    this.escuchaMasmenosplayer.unsubscribe();
    clearTimeout(this.delayPlayingMaster);
    this.delayPlayingPlayer.forEach((delay, indice) => {
      if (delay) {
        clearTimeout(delay);
        this.delayPlayingPlayer[indice] = null;
      }
    })
  }

  getColorEmisor(emisor: string): string {
    let color: string;
    if (emisor == this.ps.master.name || emisor == this.ps.system) {
      color = 'white';
    } else {
      color = this.ps.playerColors[this.ps.players.findIndex((usuario) => usuario.name == emisor)];
    }
    return color;
  }

  nuevaFecha(fecha: Date, i: number): boolean {
    let resp: boolean = false;
    if (i > 0) {
      if (fecha.toDateString() != this.mcs.mensajesChat[i - 1].fecha.toDateString()) {
        resp = true;
      }      
    }else {
      resp = true;
    }
    return resp;
  }

  scrollAbajo(mensajes: any): string {
    mensajes.scrollTop = mensajes.scrollHeight;
    this.nuevoMensaje = false;
    return ''
  }


  enviarMensaje(input: any, tecla?: number) {
    if (this.delayKeyUp) {
        clearTimeout(this.delayKeyUp);
    };
    let estadoEscribiento = {
      campaignCode: this.cs.actualCampaign.idCampaign,
      player: this.us.user.name,
      estado: true
    };
    this.wss.emite('send-escribiendo', estadoEscribiento);
    this.delayKeyUp = setTimeout(() => {
      estadoEscribiento.estado = false;
      this.wss.emite('send-escribiendo', estadoEscribiento);
      if ((!tecla) || (tecla == 13)) {
        let mensajeChat = {
          campaignCode: this.cs.actualCampaign.idCampaign,
          emisor: this.us.user.name,
          mensaje: input.value,
          fecha: new Date()
        }
        this.mcs.mensajesChat.push(mensajeChat);
        this.wss.emite('send-message', mensajeChat);
        input.value = '';
        this.mcs.postChatMessage(mensajeChat).subscribe(() => { 
          this.nuevoMensaje = true;
        });
      }
    }, 250)
  }

  valorAchat(tirada: Tirada, veloModalDados: any) {
    this.modalDados(veloModalDados, false);
    if (tirada.valor != 0) {
      let mensajeChat = {
        campaignCode: this.cs.actualCampaign.idCampaign,
        emisor: this.ps.system,
        mensaje: `Resultado tirada '${tirada.cantidad}d${tirada.caras}' para '${this.us.user.name}': ${tirada.valor}`,
        fecha: new Date()
      }
      this.mcs.mensajesChat.push(mensajeChat);
      this.wss.emite('send-message', mensajeChat);
      this.mcs.postChatMessage(mensajeChat).subscribe(() => { });
    }
  }

  playing() {
    let playing = {
      campaignCode: this.cs.actualCampaign.idCampaign,
      name: this.us.user.name
    }
    this.wss.emite('send-playing', playing);
  }

  // para abrir modal
  modalDados(veloModalDados: HTMLElement, visible: boolean) {
    veloModalDados.style.display = (visible) ? 'flex' : 'none';
  }
}
