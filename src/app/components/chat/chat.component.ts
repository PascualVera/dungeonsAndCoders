import { Component, OnInit } from '@angular/core';
import { Tirada } from 'src/app/models/tirada';
import { MensajeChat } from '../../models/mensaje-chat';
import { UserService } from '../../shared/user.service';
import { PlayersService } from '../../shared/players.service';
import { WebSocketService } from 'src/app/shared/web-socket.service';
import { MensajesChatService } from '../../shared/mensajes-chat.service';
import { CampaingService } from '../../shared/campaing.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private delayKeyUp: any;
 
  constructor(public ps: PlayersService,
              public us: UserService,
              public cs: CampaingService,
              public mcs: MensajesChatService,
              private wss: WebSocketService
              ) {

    this.mcs.getCampaignMessages(this.cs.actualCampaign.idCampaign)
      .subscribe((resp: any) => {
        if (resp.ok) {      
          resp.resultado.forEach((item) => {
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
    this.wss.escucha('new-message').subscribe((data: any) => {
      const { campaignCode, emisor, mensaje, fecha } = data;
      if (campaignCode == this.cs.actualCampaign.idCampaign) {
        this.mcs.mensajesChat.push(new MensajeChat(campaignCode, emisor, mensaje, new Date(fecha)));
      }
    })  
    this.wss.escucha('new-escribiendo').subscribe((data: any) => {
      const { campaignCode, player, estado } = data;
      if (campaignCode == this.cs.actualCampaign.idCampaign) {
        this.ps.setEscribiendo(player, estado);
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
        this.mcs.postChatMessage(mensajeChat).subscribe(() => { });
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

  // para abrir modal
  modalDados(veloModalDados: HTMLElement, visible: boolean) {
    veloModalDados.style.display = (visible) ? 'flex' : 'none';
  }
}
